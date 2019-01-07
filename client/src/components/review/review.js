import React from 'react'

export default props => {
  const { date, description, rating, user_id } = props
  const starsDisplay = [];

  for (let x = 0; x < rating; x++){
    starsDisplay.push(<i key={x} className = "star icon"></i>);
  }
  const newDate = new Date(date).toLocaleDateString();

  return (
      <div className="ui divided items container">
        <div className="item">
          <div className="content">
            <span className="header">{user_id}</span>
            <span className="date">  {newDate}</span>
            <div className="meta">
              <span>
                {starsDisplay}
              </span>
              </div>
            <div className="description">
              <p>{description}</p>
            </div>
          </div>
          </div>
      </div>
    );
}