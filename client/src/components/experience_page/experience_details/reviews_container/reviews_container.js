import React from 'react'
import './reviews_container.css'
import Review from './review/review'
import ReviewForm from './review_form/review_form';

export default props => {
  const{avg, total, reviews} = props
  const avgRating = Math.floor(avg);
  const remainder = avg - avgRating;
  const starsDisplay = [];
  let newReview = [];
  
  if (reviews) {
    newReview = reviews.map(item => {
      const {date, description, rating, id, reviewer} = item;
      
      return <Review key={id} date={date} description={description} rating={rating} reviewer={reviewer} />
    });
  }

  for (let x = 0; x < avgRating; x++) {
    starsDisplay.push(<i key={x} className = "star icon"></i>);
  }

  if (remainder >= 0.5) {
    starsDisplay.push(<i key={4} className = "star half icon"></i>);
  }

  return(
    <div className = "ui container" id="reviewsContainer">
      <h2>{total} Reviews</h2>
      <p>{starsDisplay}  {avg ? avg.toFixed(1) : ''}</p>
      {newReview}
      <ReviewForm />
    </div>
  );
}