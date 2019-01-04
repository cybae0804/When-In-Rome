import React from 'react';
import { Link, Route } from 'react-router-dom';
const { resolve } = require('path');
import './experience_preview.css';

export default props => {
  const { id, image_url, activity, occupation, price, duration, average_rating, total_ratings } = props;
  const title = `${activity} with a ${occupation}`;
  const starsDisplay = [];
  const averageRatingInteger = Math.floor(average_rating);
  const averageRatingDecimal = average_rating - averageRatingInteger;

  for (let i = 0; i < averageRatingInteger; i++) {
    starsDisplay.push(<i key={i} className="star icon"></i>);
  }

  if (averageRatingDecimal >= 0.5) {
    starsDisplay.push(<i key={5} className="star half icon"></i>);
  }

  const image = resolve('assets', 'images') + '/' + image_url;
  
  return (
    <div className="experience-preview column">
      <div className="image">
        <Link to={"/experience/" + id}>
          <img src={image} alt={title} width="100%" height="165px" />
        </Link>
      </div>
      <div className="header">
        <Link to={"/experience/" + id}>
          <h3>{title}</h3>
        </Link>
      </div>
      <div className="content">
        <p>${price}</p>
        <p>{duration}</p>
        <p>
          {starsDisplay}
          <span>{total_ratings}</span>
        </p>
      </div>
    </div>
  );
}
