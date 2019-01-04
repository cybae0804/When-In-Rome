import React from 'react';
const { resolve } = require('path');
import './experience_details.css';
import Calendar from 'react-calendar';

export default props => {
  const { id, 
          image, 
          activity, 
          occupation, 
          city, 
          country, 
          price, 
          guests, 
          host, 
          host_info,
          activity_info,
          duration, 
          average_rating, 
          total_ratings } = props;

  const title = `${activity} with a ${occupation}`;
  let starsDisplay = [];
  const averageRatingInteger = Math.floor(average_rating);
  const averageRatingDecimal = average_rating - averageRatingInteger;

  for (let i = 0; i < averageRatingInteger; i++) {
    starsDisplay.push(<i key={i} className="star icon"></i>);
  }

  if (averageRatingDecimal >= 0.5) {
    starsDisplay.push(<i key={5} className="star half icon"></i>);
  }

  const image_url = resolve('assets', 'images') + '/' + image;

  return (
    <div className="topMargin">
      <div className="ui image rounded container">
        <img src={image_url} />
      </div>
      <div className="ui relaxed list container">
        <div className="item">
          <i className= "icon map marker alternate large" id="detailsIcon"></i>
          {`${city}, ${country}`}
        </div>
        <div className="item">
          <i className="icon dollar sign large" id="detailsIcon"></i>
          {`$${price}`}
        </div>
        <div className="item">
          <i className="icon clock outline large" id="detailsIcon"></i>
          Full Day
        </div>
        <div className="item">
          <i className="icon users large" id="detailsIcon"></i>
          {guests}
        </div>
        <div className="item">
          <i className="icon id badge large" id="detailsIcon"></i>
          {host}
        </div>
      </div>
      <div className="ui container">
        <h2 className="host">
          Host
        </h2>
        <p>{host_info}</p>
        <h2 className="host">
          Activity
        </h2>
        <p>{activity_info}</p>
      </div>
      <div>
        <Calendar/>
      </div>
    </div>
  )
}