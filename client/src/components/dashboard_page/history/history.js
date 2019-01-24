import React from 'react';
import './history.css';

export default ({ data }) => {
  if (data[0]) {
    data = data[0];
  } else {
    data = {
      'average_rating': 0,
      'earnings' : 0,
      'total_ratings': 0
    }
  }

  return (
    <div className="topMargin24px">
      <h2 className="ui header horizontal divider container">History</h2>
        <div className="ui middle aligned list container history">
          <div className="item">
            <div className="right floated content">
              <h4 className="content manualWeight">${data.earnings ? data.earnings : 0}</h4>
            </div>
            <div className="content">
              <h4>Total Earnings</h4>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <h4 className="content manualWeight">{data.average_rating ? data.average_rating : 0} out of 5</h4>
            </div>
            <div className="content">
              <h4>Overall Rating</h4>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <h4 className="content manualWeight">{data.total_ratings ? data.total_ratings : 0}</h4>
            </div>
            <div className="content">
              <h4>Total Reviews</h4>
            </div>
          </div>
        </div>
    </div>
  );
}