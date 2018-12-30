import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const { id, image, activity, occupation, price, duration, averageRating, totalRatings } = props;
  const title = `${activity} with a ${occupation}`;
  let starsDisplay = [];
  const averageRatingInteger = Math.floor(averageRating);
  const averageRatingDecimal = averageRating - averageRatingInteger;

  for (let i = 0; i < averageRatingInteger; i++) {
    starsDisplay.push(<i key={i} className="material-icons">star</i>);
  }

  if (averageRatingDecimal >= 0.5) {
    starsDisplay.push(<i className="material-icons">star_half</i>);
  }

  return (
      <div className="experiencePreview">
        <Link to={"/experience/" + id}>
          <img src={image} alt={title} />
          <h3>{title}</h3>
        </Link>
        <p>${price}</p>
        <p>{duration}</p>
        <p>
          {starsDisplay}
          <span>{totalRatings}</span>
        </p>
      </div>
  );
}
