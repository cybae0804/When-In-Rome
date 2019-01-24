import React, {Component} from 'react';
import Calendar from '../../shared/calendar/calendar';
import './reservations.css';

class Reservations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDate: "",
      version: "",
      originalDates: [],
      dates: []
    }
  } 

  getDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  } 

  formatDate = (date) => {
    return date.substring(0, 10)
  }

  displayDates = (datesArray, date) => {
    const currentDate = this.getDate(new Date(date))
    for (let booking of datesArray) {
      let matchingDates = currentDate === this.getDate(new Date(booking.date));
      if (matchingDates && booking.guests) {
        return "booked";
      } else if (matchingDates) {
        if(booking.status){
          return ""
        }
        return "active";
      }
    }
    return "";
  }

  handleDateClicked = (date) => {
    console.log(this.props)
    const currentDate = this.getDate(new Date(date));
    const originalDates = this.props.data.slice();
    const dates = this.props.data

    this.setState({
      currentDate,
      originalDates,
      dates,
    }, () => {
      for (let booking of this.state.dates) {
        var version = ""
        let matchingDates = currentDate === this.getDate(new Date(booking.date))
        if (matchingDates && booking.guests){
          version = "booked"
          break;
        }
      }
      var dates = this.toggleAvailableCalendar();

      this.setState({
        version,
        dates,
      })  
    })
  }


  handleConfirmButtonClicked = () => {
    const {dates} = this.state
    this.setState({
      dates,
      version: ""
    })
  }

  handleClearButtonClicked = () => {
    const {originalDates} = this.state;
    const clearDates = originalDates.slice()
    this.setState({
      dates: clearDates,
      version: ""
    })
  }

  toggleAvailableCalendar = () => {
    const {dates, currentDate } = this.state;
    for (let booking of dates) {
      let matchingDates = currentDate === this.formatDate(booking.date);
      if(matchingDates && !booking.guests) {
        booking.status = "delete";
        return dates;
      }
    }
    const available = {
      date: currentDate,
      name: "",
      guests: null,
    }
    dates.push(available)
    return dates;
  }

  viewBookedDetails = () => {
    const {currentDate, dates} = this.state
    for (let booking of dates) {
      let matchingDates = currentDate === this.formatDate(booking.date);
      if (matchingDates && booking.guests){
        return(
          <table className="ui collapsing unstackable table" id="details">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{booking.date}</td>
                <td>{booking.name}</td>
                <td>{booking.guests}</td>
              </tr>
            </tbody>
          </table>
        )
      }
    }
  }

  displayDropDown = () => {
    switch (this.state.version){
      case "booked":
        return this.viewBookedDetails()
      default:
        return ""
    }
  }

  calendarVersion = () => {
    // console.log(this.props)
    const {asUser, data = []} = this.props
    
    return asUser ? 
    <Calendar
      onChange= {(date) => {
        
        console.log("display booked details", date)
      }}
      tileDisabled={({date}) => {
        // console.log(date)
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
      tileClassName={(date) => this.displayDates(this.props.data, date.date)}
    /> : 
    <Calendar 
      onChange={ (date) => {
        this.handleDateClicked(date);
      }}
      tileClassName={(date) => this.displayDates(this.props.data, date.date)}
    />
  }
  render(){
    console.log(this.props, this.state)
    
    return(
      <div className="topMargin24px">
        <h2 className="ui header horizontal divider container">Reservations</h2>
          {this.calendarVersion()}
        <div className="center">
          <div className="ui horizontal list center-aligned topMargin">
            <div className="item center">
              <div className="content legend" id="booked">
              </div>
              <span>Booked</span>
            </div>
            <div className="item center">
              <div className="content legend" id="available">
              </div>
              <span>Available</span>
            </div>
            <div className="item center">
              <div className="content legend" id="unavailable">
              </div>
              <span>Unavailable</span>
            </div>
        </div>
        {this.displayDropDown(this.state.currentDate, this.state.dates)}
        {this.props.asUser ? "" : 
        <div className="center">
          <button className="ui primary button center" onClick = {this.handleConfirmButtonClicked}>Confirm</button>
          <button className="ui negative red button center" onClick = {this.handleClearButtonClicked}>Clear</button>
        </div>}
      </div>
      </div>
      
    )
  }
}

export default Reservations;
