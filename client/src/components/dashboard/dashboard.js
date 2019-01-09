import React from 'react';
import './dashboard.css'
import Calendar from 'react-calendar';
import HamburgerButton from '../hamburger_button/hamburger_button'

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
      <div className="ui middle aligned list container bigTopMargin">
        <div className="item">
          <div className="right floated content">
            <button className="ui tiny button green content">View</button>
          </div>
          <div className="content">
            <h3>2/21</h3>
          </div>
        </div>
      </div>
      <h2 className="ui header horizontal divider container">Reservations</h2>
      <div>
        <Calendar/>
      </div>
      <h2 className="ui header horizontal divider container">Active Listings</h2>
      <div className="ui middle aligned list container">
        <div className="item">
          <div className="right floated content">
            <button className="ui tiny button green content">Edit</button>
          </div>
          <div className="content">
            <h3>Hiking With a Hermit</h3>
          </div>
        </div>
      </div>
      <h2 className="ui header horizontal divider container">History</h2>
      <div className="ui middle aligned list container history">
        <div className="item">
          <div className="right floated content">
            <h4 className="content">$60</h4>
          </div>
          <div className="content">
            <h4>Total Earnings</h4>
          </div>
        </div>
        <div className="item">
          <div className="right floated content">
            <h4 className="content">4.8 out of 5</h4>
          </div>
          <div className="content">
            <h4>Overall Rating</h4>
          </div>
        </div>
        <div className="item">
          <div className="right floated content">
            <h4 className="content">61</h4>
          </div>
          <div className="content">
            <h4>Total Reviews</h4>
          </div>
        </div>
      </div>
    </div>
  )
}