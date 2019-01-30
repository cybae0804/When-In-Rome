import React from 'react';

export default props => {
  const { count, current } = props;
  const dots = [];

  for (let i = 0; i < count; i++) {
    dots.push(
      <div key={i} className={`dot ${current === i ? 'current' : ''}`}></div>
    )
  }

  return (
    <div className="indicators">
      {dots}
    </div>
  )
}
