import React from 'react'
import './reviews.css'

export default props => {
  const{avg, total} = props
  const avgRating = Math.floor(avg);
  const remainder = avg -avgRating;
  let starsDisplay = [];
  
  for (let x = 0; x<avgRating; x++){
    starsDisplay.push(<i key = {x} className = "star icon"></i>);
  }
  if (remainder >= 0.5){
    starsDisplay.push(<i key = {5} className = "star half icon"></i>);
  }
  return(
    <div className = 'ui container'>
      <h2>{total} Reviews:</h2>
      <p>{starsDisplay}  {avgRating.toFixed(1)}</p>
    </div>
  );
}