import React from 'react'
// import User from '../../../dist/assets/images/user.jpg';

export default props => {
  const{date, description, rating, user_id} = props
  let starsDisplay = [];
  for (let x = 0; x < rating; x++){
    starsDisplay.push(<i key={x} className = "star icon"></i>);
  }
  const newDate = new Date(date).toLocaleDateString();
  console.log("single Review", props)
  return (
      <div className="ui divided items container">
        <div className="item">
          <div className="content">
            {/* <img className="ui avatar image" src={User}/> */}
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