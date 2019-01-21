import React, {Component} from 'react'
import Calendar from '../../shared/calendar/calendar';
import './reservations.css'

class Reservations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDate: "",
      version: "",
      toggle: [],
      dates: [
        {
          date: '2019-0-20',
          name: "jimbob",
          guests: 3
        },
        {
          date: '2019-0-27',
          name: "Joebob",
          guests: 2
        },
        {
          date: '2019-0-18',
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
    })
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
    this.setState({
      version
    })
  }

  toggleActive = () => {
    return(
      <div id="toggle">
        <button className="ui primary button topMargin">
          Make (Un)Available
        </button>
      </div>
    )
  }

  handleClickAvailable = () => {
    console.log(this.state.toggle)
  }

  viewDetails = () => {
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
        return this.toggleActive()
      case "booked":
        return this.viewDetails()
      default:
        return ""
    }
  }
  render(){
    console.log(this.state);
    return(
      <div className="topMargin">
        <h2 className="ui header horizontal divider container">Reservations</h2>
        <Calendar 
          onChange={(date) => {
            console.log(this.getDate(date));
            this.handleDateClicked(date)
          }}
          tileClassName={(date) => this.displayDates(this.state.dates, date.date)}
          />
          {/* {this.viewDetails(this.state.dates[0])} */}
          {/* {this.toggleActive()} */}
          {this.displayDropDown(this.state.currentDate, this.state.dates)}
      </div>
      
    )
  }
}

export default Reservations;
