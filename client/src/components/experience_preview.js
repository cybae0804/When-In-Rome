import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../assets/css/experience_preview.css';

export default props => {
  const { id, image, activity, occupation, price, duration, averageRating, totalRatings } = props;
  const title = `${activity} with a ${occupation}`;
  let starsDisplay = [];
  const averageRatingInteger = Math.floor(averageRating);
  const averageRatingDecimal = averageRating - averageRatingInteger;

  for (let i = 0; i < averageRatingInteger; i++) {
    starsDisplay.push(<i key={i} className="star icon"></i>);
  }

  if (averageRatingDecimal >= 0.5) {
    starsDisplay.push(<i className="star half icon"></i>);
  }

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
          <span>{totalRatings}</span>
        </p>
      </div>
      {/* <Route path={'experience/:' } component={ExperiencePreview}/> */}
    </div>
  );
}
