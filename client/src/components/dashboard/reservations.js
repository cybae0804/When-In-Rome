import React from 'react'
import Calendar from '../calendar/calendar';

export default () => {
  return(
    <div className="topMargin">
      <h2 className="ui header horizontal divider container">Reservations</h2>
      <Calendar/> 
    </div>
  )
}