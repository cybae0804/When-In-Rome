import './reservations.css';
import React, {Component} from 'react';
import {displayDates} from '../../../helper';
import axios from 'axios';
import Calendar from '../../shared/calendar/calendar';

class Reservations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDate: "",
      version: "",
      dates: [],
      experience_id: null,
    }
  } 

  componentDidUpdate(prevProps){
    if ((prevProps.data.length === 0 && this.props.data.length !== 0) || (prevProps.asUser !== this.props.asUser)){
      if (this.props.data.length !==0){
        const experience_id = this.props.data[0].experience_id
        this.setState({
          dates: this.props.data.slice(),
          experience_id
        });
      } else {
        this.setState({
          dates: []
        });
      }
    }
  }

  getDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  } 

  displayDates = (datesArray, date) => {
    const currentDate = date
    for (let booking of datesArray) {
      let matchingDates = this.getDate(new Date(currentDate)) === this.getDate(new Date(booking.date));
      if (matchingDates && booking.guests) {
        return "booked";
      } else if (matchingDates) {
        if (booking.status){
          return ""
        }
        return "active";
      } 
    }

    return "";
  }

  handleDateClicked = (date) => {
    const currentDate = date;
    
    this.setState({
      currentDate
    }, () => {
      for (let booking of this.state.dates) {
        var version = "";
        let matchingDates = this.getDate(new Date(currentDate)) === this.getDate(new Date(booking.date));
        
        if (matchingDates && booking.guests){
          version = "booked"
          break;
        }
      }
      const dates = this.toggleAvailableCalendar();
      this.setState({
        version,
        dates,
      });
    });
  }


  handleConfirmButtonClicked = async () => {
    const {dates, experience_id} = this.state;
    
    for (let booking of dates){
      if (!booking.date){
        dates.splice(booking, 1);
      }

      booking.date = this.getDate(new Date(booking.date));
    }

    try {
      await axios.post(`/api/experiences/${experience_id}/dates`, {dates})
      this.props.getServerData();
    }
    catch (err) {
      console.log('Error Setting new available dates', err)
    }
  }

  handleClearButtonClicked = () => {
    this.setState({
      dates: [...this.props.data],
      version: ""
    });
  }

  toggleAvailableCalendar = () => {
    let {dates, currentDate } = this.state;
    
    for (let booking of dates) {
      let matchingDates = this.getDate(new Date(currentDate)) === this.getDate(new Date(booking.date));
      
      if (matchingDates && !booking.guests) {
        if (booking.status === "delete"){
          delete booking.status
          return dates
        }

        booking.status = "delete";
        return dates;
      }
    }
    
    const available = {
      date: this.getDate(new Date(currentDate)),
      name: "",
      guests: null,
    }
    
    return [...dates, available];
  }

  viewBookedDetails = () => {
    const {currentDate, dates} = this.state
    
    for (let booking of dates) {
      let matchingDates = this.getDate(new Date (currentDate)) === this.getDate(new Date(booking.date))
      
      if (matchingDates && booking.guests){
        return (
          <table className="ui collapsing unstackable table" id="details">
            <thead>
              <tr>
                <th>Date</th>
                <th>{this.props.asUser ? 'Title' : 'Name'}</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.getDate(new Date(booking.date))}</td>
                <td>{this.props.asUser ? booking.title : booking.name}</td>
                <td>{booking.guests}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    }
  }

  displayDropDown = () => {
    if (this.props.data.length === 0){
      return '';
    }

    switch (this.state.version){
      case "booked":
        return this.viewBookedDetails()
      default:
        return ""
    }
  }

  displayLegend() {
    const {asUser} = this.props
    return asUser ?
      <div className="ui container topMargin calendar-legend">
        <div className="center">
          <div className="content legend" id="booked"></div>
          <span>Booked</span>
        </div>
      </div>
         : 
      <div className="ui container topMargin calendar-legend">
        <div className="center">
          <div className="content legend" id="booked"></div>
          <span>Booked</span>
        </div>
        <div className="center">
          <div className="content legend" id="available"></div>
          <span>Available</span>
        </div>
        <div className="center">
          <div className="content legend" id="unavailable"></div>
          <span>Unavailable</span>
        </div>
      </div>
  }

  calendarVersion = (disabled) => {
    const {asUser, data = []} = this.props

    if (disabled) {
      return (
        <Calendar
          name='disabledCalendar'
          tileDisabled={({date}) => (true)}
        />
      );
    }

    return asUser ? 
    <Calendar
      tileDisabled={({date}) => {
        for (let booking of data) {
          let matchingDates = this.getDate(date) === this.getDate(new Date(booking.date));
          if(matchingDates){
            var disabled = false
            break;
          } else {
            var disabled =  true
          }
        }
          return disabled
      }}
      tileClassName={(date) => this.displayDates(this.state.dates, date.date)}
      onChange={ (date) => {
        this.handleDateClicked(date);
      }}
    /> : 
    <Calendar
      onChange={ (date) => {
        this.handleDateClicked(date);
      }}
      tileClassName={(date) => this.displayDates(this.state.dates, date.date)}
    />
  }

  render(){
    return (
      <div className="topMargin24px">
        <h2 className="ui header horizontal divider container">Reservations</h2>
          {this.props.data.length === 0 ? this.calendarVersion( true ) : this.calendarVersion()}
        <div className="topMargin8px ui container center">
          {this.displayLegend()}
          {this.displayDropDown(this.state.currentDate, this.state.dates)}
          {this.props.asUser ? "" :
          <div className="topMargin">
            {this.state.dates.length === 0 ? <div className="ui warning message">
              <div className="header">
                No events being hosted.
              </div>
              <p>Please create an event above to start making dates available.</p>
            </div> : 
            this.state.dates[0].date_id === null && this.state.currentDate === '' ? 
            <div className="ui warning message">
              <div className="header">
                No available dates.
              </div>
              <p>{`Please set available dates for your event: ${this.state.dates[0].title}`}</p>
            </div>
            : <div>
              <button className="ui positive button " onClick={this.handleConfirmButtonClicked}>Confirm</button>
              <button className="ui orange button" onClick={this.handleClearButtonClicked}>Cancel</button>
            </div>}
          </div>}
        </div>
      </div> 
    );
  }
}

export default Reservations;
