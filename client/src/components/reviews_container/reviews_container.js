import React from 'react'
import './reviews_container.css'
import Review from '../review/review'

export default props => {
  console.log(props)
  const{avg, total, reviews} = props
  const avgRating = Math.floor(avg);
  const remainder = avg - avgRating;
  let starsDisplay = [];
  let newReview = [];
  if(reviews){
    newReview = reviews.map((item, index) =>{
      const {date, description, rating, user_id, id} = item;
      return <Review key={id} date={date} description={description} rating={rating} user_id={user_id}/>
    });
  }

  for (let x = 0; x < avgRating; x++){
    starsDisplay.push(<i key={x} className = "star icon"></i>);
  }
  if (remainder >= 0.5){
    starsDisplay.push(<i key={5} className = "star half icon"></i>);
  }
  return(
    <div className = "ui container">
      <h2>{total} Reviews:</h2>
      <p>{starsDisplay}  {avg ? avg.toFixed(1) : ''}</p>
      {newReview}
    </div>
  );
}