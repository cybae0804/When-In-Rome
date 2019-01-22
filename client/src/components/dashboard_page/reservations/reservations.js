import React, {Component} from 'react';
import Calendar from '../../shared/calendar/calendar';
import './reservations.css';

class Reservations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDate: "",
      version: "",
      toggle: [],
      dates: [
        {
          date: '2019-0-24',
          name: "jimbob",
          guests: 3
        },
        {
          date: '2019-0-27',
          name: "Joebob",
          guests: 2
        },
        {
          date: '2019-0-23',
          name: '',
          guests: null
        },
        {
          date: '2019-0-26',
          name: '',
          guests: null
        }
      ] 
    }
  } 

  displayDates = (datesArray, date) => {
    debugger;
    const currentDate = this.getDate(date);
    for (let booking of datesArray) {
      let matchingDates = currentDate === booking.date;
      if (matchingDates && booking.name) {
        return "booked";
      } else if (matchingDates) {
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
        }else{
          version = "toggle"
        }
      }
      var dates = this.toggleAvailableCalendar();
      var toggle = this.toggleAvailableTable();
      this.setState({
        version,
        dates,
        toggle 
      })
    })
  }

  viewToggleDates = () => {
    const { toggle } = this.state
    console.log("toggle display data", this.state.toggle)
    const displayDates = toggle.map(date => (
      <tr>
        <td>{date.date}</td>
        <td>{date.available ? "Available" : "Unavailable"}</td>
      </tr>
    ))
    return(
      <div className="topMargin" id = "details">
        <table className="ui collapsing table" id="detailsTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayDates}
          </tbody>
        </table> 
        <button className="ui primary button topMargin" onClick = {this.handleToggleButtonClicked}>
          Make (Un)Available
        </button>
       </div>
    )
  }

  handleToggleButtonClicked = () => {
    const { toggle, dates } = this.state
    for ( let toggleDates of toggle ) {
      if (dates.available){
        toggleDates.push({
          date: toggleDate.date,
          name: "",
          guests: null
        })
      }
    }
    this.setState({
      toggle: []
    })
    // console.log(dates)
  }

  toggleAvailableTable = () => {
    const {currentDate, toggle } = this.state
    for( let available of toggle){
      let matchingDates = currentDate === available.date;
      if( matchingDates && available.available ){
        available.available = true
      } else if( matchingDates ){
        available.available = false
      }
    }
    return toggle
  }

  toggleAvailableCalendar = () => {
    const {dates, currentDate, toggle} = this.state;
    // var newDates = dates
    for (let booking of dates) {
      let matchingDates = currentDate === booking.date;
      if(matchingDates && !booking.name) {
        console.log("clicked already available date");
        for ( let dates of toggle ){
          let matchingDates = currentDate === dates.date;
          var removeDate = toggle.indexOf(dates)
          if(matchingDates){
            toggle.splice(removeDate, 1)
          }
        }
        toggle.push({
          date: currentDate,
          available: false
        })
        var makeUnavailable = dates.indexOf(booking);
        // console.log("make unavailable", makeUnavailable);

        dates.splice(makeUnavailable, 1);
        return dates;
      }
    }
    const available = {
      date: currentDate,
      name: "",
      guests: null
    }
    for ( let dates of toggle ){
      let matchingDates = currentDate === dates.date;
      var removeDate = toggle.indexOf(dates)
      if(matchingDates){
        toggle.splice(removeDate, 1)
      }
    }
    toggle.push({
      date: currentDate,
      available: true
    })
    console.log(toggle)
    dates.push(available)
    return dates;
  }

  viewBookedDetails = () => {
    const {currentDate, dates} = this.state
    for (let booking of dates) {
      let matchingDates = currentDate === booking.date;
      if (matchingDates && booking.name){
        return(
          <table className="ui collapsing table topMargin" id="details">
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
      case "toggle":
        return this.viewToggleDates()
      case "booked":
        return this.viewBookedDetails()
      default:
        return ""
    }
  }
  render(){
    // console.log(this.state.toggle)
    return(
      <div className="topMargin">
        <h2 className="ui header horizontal divider container">Reservations</h2>
        <Calendar 
          onChange={ (date) => {
            this.handleDateClicked(date);
          }}
          tileClassName={(date) => this.displayDates(this.state.dates, date.date)}
          />
          {this.displayDropDown(this.state.currentDate, this.state.dates)}
      </div>
      
    )
  }
}

export default Reservations;