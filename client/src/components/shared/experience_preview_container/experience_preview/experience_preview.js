import React from 'react';
import { Link } from 'react-router-dom';
import './experience_preview.css';

export default props => {
  const { id, activity, occupation, price, duration, average_rating, total_ratings, imagePath } = props;
  
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

  const image_url = 'https://s3-us-west-1.amazonaws.com/when-in-rome/' + imagePath;
  
  return (
    <div className="experience-preview">
      <div className="image smallBottomMargin">
        <Link to={"/experience/" + id}>
          <div className='experience-preview-item' style={{'backgroundImage': `url(${image_url})` }}></div>
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
