import React from 'react'
import Calendar from 'react-calendar'

export default () => {
  return(
    <div className="topMargin">
      <h2 className="ui header horizontal divider container">Reservations</h2>
      <div>
        <Calendar/>
      </div>
    </div>
  )
}