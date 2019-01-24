import React from 'react';
import { withRouter } from 'react-router';
import { keygen } from '../../../helper';

export default withRouter(({history, data}) => {
  const organized = {};
  const display = [];
  const today = new Date();

  for (let i = 0; i < data.length; i++){
    if (new Date(data[i].date) >= today) {
      if (!organized[data[i].experience_id]){
        organized[data[i].experience_id] = [data[i]];
      } else {
        organized[data[i].experience_id].push(data[i]);
      }
    }
  }

  for (let item in organized){
    display.push((
      <div className='item' key={keygen()}>
        <div className="content">
          <h3 className='truncate'>{organized[item][0].title}</h3>
        </div>
      </div>
    ));

    for (let i = 0; i < organized[item].length; i++){
      display.push((
        <div key={keygen()} className={`item indentedItem ${i === organized[item].length-1 ? 'bottomMargin20px' : ''}`}>
          <div className="right floated content">
            <button 
              className="ui mini button green content "
              onClick={() => {history.push(`/experience/${organized[item][i].experience_id}`)}}  
            >View</button>
          </div>
          <div className="content">
            <h4 className='topMargin4px'>- {organized[item][i].date.substring(0, 10)}</h4>
          </div>
        </div>
      ));
    }
  }
  
  return (
    <div className = "bigTopMargin">
      <h2 className="ui header horizontal divider container">Upcoming</h2>
      <div className="ui middle aligned list container">
        {display}
      </div>
      <h3 className="container align center ui">
        {display.length ? null : 'You have no upcoming sessions.'}
      </h3>
    </div>
  );
});
