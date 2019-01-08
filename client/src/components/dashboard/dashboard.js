import React from 'react';
import './dashboard.css'
import Calendar from 'react-calendar';
import HamburgerButton from '../hamburger_button/hamburger_button'

export default () => {
  return(
    <div>
      <h1 className="ui header container topMargin">Dashboard</h1>
      <HamburgerButton/>
      <div className="ui equal width grid container topMargin">
        <a className="ui column button"><h3>As Host</h3></a>
        <a className="ui column button"><h3>As User</h3></a>
      </div>
      <h2 className="ui header horizontal divider container topMargin">Upcoming</h2>
        <h4 className="ui left floated header container">2/21</h4>
        {/* <h4 className="ui floated">Hiking with a Hermit</h4> */}
        <button className="ui right floated tiny green button container">View</button>
      <h2 className="ui header horizontal divider container bigTopMargin">Reservations</h2>
      <div>
        <Calendar/>
      </div>
      <h2 className="ui header horizontal divider container">Active Listings</h2>
      <h3 className="ui left floated header container">Hiking With a Hermit</h3>
      <button className="ui right floated tiny green button container">View</button>
     

    </div>
  )
}