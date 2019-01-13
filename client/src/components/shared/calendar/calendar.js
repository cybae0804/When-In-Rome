import React from 'react'
import './calendar.css'
import Calendar from 'react-calendar'

export default props => {
  // console.log(props)
  return(
  <div className="calendar" id="calendarID">
    <Calendar 
      {...props}
      minDate={new Date()}
      prevLabel={<i className="arrow left icon"></i>}
      nextLabel={<i className="arrow right icon"></i>}
    />
  </div>
  )
}