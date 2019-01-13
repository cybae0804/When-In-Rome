import React from 'react'
import Calendar from '../../shared/calendar/calendar';

export default () => {
  const dateArray = ['1/20/2019', '1/23/2019'];
  return(
    <div className="topMargin">
      <h2 className="ui header horizontal divider container">Reservations</h2>
      <Calendar 
        onChange={
          ((date) => console.log(date.toLocaleDateString()))
        } 
        tileContent={({activeStartDate, date, view}) => dateArray.includes(date.toLocaleDateString()) ? <i className="icon check large"></i> : null }
      />
    </div>
  )
}