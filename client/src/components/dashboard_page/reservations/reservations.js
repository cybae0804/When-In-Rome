import React, {Component} from 'react';
import Calendar from '../../shared/calendar/calendar';
import './reservations.css';

class Reservations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDate: "",
      version: "",
      originalDates: [
        {
          date: '2019-0-24',
          name: "jimbob",
          guests: 3,
        },
        {
          date: '2019-0-27',
          name: "Joebob",
          guests: 2,
        },
        {
          date: '2019-0-23',
          name: '',
          guests: null,
        },
        {
          date: '2019-0-26',
          name: '',
          guests: null,
        }
      ],
      dates: [
        {
          date: '2019-0-24',
          name: "jimbob",
          guests: 3,
        },
        {
          date: '2019-0-27',
          name: "Joebob",
          guests: 2,
        },
        {
          date: '2019-0-23',
          name: '',
          guests: null,
        },
        {
          date: '2019-0-26',
          name: '',
          guests: null,
        }
      ] 
    }
  } 

  displayDates = (datesArray, date) => {
  
    const currentDate = this.getDate(date);
    for (let booking of datesArray) {
      let matchingDates = currentDate === booking.date;
      if (matchingDates && booking.name) {
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

  getDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  } 

  handleDateClicked = (date) => {
    const currentDate = this.getDate(date);
    this.setState({
      currentDate
    }, () => {
      for (let booking of this.state.dates) {
        var version = ""
        let matchingDates = currentDate === booking.date;
        if (matchingDates && booking.name){
          version = "booked"
          break;
        }
      }
      var dates = this.toggleAvailableCalendar();

      this.setState({
        version,
        dates
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
      let matchingDates = currentDate === booking.date;
      if(matchingDates && !booking.name) {
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
      let matchingDates = currentDate === booking.date;
      if (matchingDates && booking.name){
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
  render(){
    return(
      <div className="topMargin24px">
        <h2 className="ui header horizontal divider container">Reservations</h2>
        <Calendar 
          onChange={ (date) => {
            this.handleDateClicked(date);
          }}
          tileClassName={(date) => this.displayDates(this.state.dates, date.date)}
          />
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
          <div className="center">
            <button className="ui primary button center" onClick = {this.handleConfirmButtonClicked}>Confirm</button>
            <button className="ui negative red button center" onClick = {this.handleClearButtonClicked}>Clear</button>
          </div>
      </div>
      </div>
      
    )
  }
}

export default Reservations;
