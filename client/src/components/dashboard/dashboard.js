import React from 'react';
import './dashboard.css'
import HamburgerButton from '../hamburger_button/hamburger_button'
import Upcoming from './upcoming'
import Reservations from './reservations'
import ActiveListing from './active-listing'
import History from './history'

export default props => {
  console.log(props)
  return(
    <div>
      <h1 className="ui header container topMargin">Dashboard</h1>
      <HamburgerButton/>
      <div className="ui equal width grid container topMargin">
        <button className="ui column button"><h3>As Host</h3></button>
        <button className="ui column button"><h3>As User</h3></button>
      </div>
      <Upcoming/>
      <Reservations/>
      <ActiveListing/>
      <History/>
    </div>
  )
}