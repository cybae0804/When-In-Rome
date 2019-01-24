import React from 'react';
import { withRouter } from 'react-router';
import { keygen } from '../../../helper';
import './upcoming.css';

export default withRouter(({history, data, asUser}) => {
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
        {asUser ? undefined : (
          <div className="right floated content">
            <button 
              className="ui mini button basic green content fixedButton"
              onClick={() => {history.push(`/edit_experience/${organized[item][0].experience_id}`)}}  
            >Edit</button>
          </div>
        )}
        <div className="content">
          <h3 className='truncate topMargin4px'>{organized[item][0].title}</h3>
        </div>
      </div>
    ));

    for (let i = 0; i < organized[item].length; i++){
      display.push((
        <div key={keygen()} className={`item indentedItem ${i === organized[item].length-1 ? 'bottomMargin20px' : ''}`}>
          <div className="right floated content">
            <button 
              className="ui mini button basic green content "
              onClick={() => {history.push(`/experience/${organized[item][i].experience_id}`)}}  
            >View</button>
          </div>
          <div className="content">
            <h4 className='topMargin4px'>{organized[item][i].date.substring(0, 10)}</h4>
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
      {asUser ? undefined : <div className='ui center aligned container'>
                              <button className='ui button' onClick={() => {history.push('/create_experience')}}>Host Experience</button>
                            </div>}
    </div>
  );
});
