import React, { Component } from 'react'
import './calendar.css'
import Calendar from 'react-calendar'

export default props => {
   const activeDates = ['1/20/2019', '1/23/2019'];
  return(
  <div className="calendar" id={props.name}>
    <Calendar 
      {...props}
      // tileClassName={({date}) => activeDates.includes(date.toLocaleDateString()) ? "active" : null}
      minDate={new Date()}
      prevLabel={<i className="arrow left icon"></i>}
      nextLabel={<i className="arrow right icon"></i>}
    />
  </div>
  )
}