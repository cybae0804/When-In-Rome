import React from 'react'

export default () => {
  return (
    <div className="topMargin">
      <h2 className="ui header horizontal divider container">History</h2>
        <div className="ui middle aligned list container history">
          <div className="item">
            <div className="right floated content">
              <h4 className="content">$60</h4>
            </div>
            <div className="content">
              <h4>Total Earnings</h4>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <h4 className="content">4.8 out of 5</h4>
            </div>
            <div className="content">
              <h4>Overall Rating</h4>
            </div>
          </div>
          <div className="item">
            <div className="right floated content">
              <h4 className="content">61</h4>
            </div>
            <div className="content">
              <h4>Total Reviews</h4>
            </div>
          </div>
        </div>
    </div>
  )
}