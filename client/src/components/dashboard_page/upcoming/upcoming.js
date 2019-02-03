import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { keygen } from '../../../helper';
import './upcoming.css';

export default withRouter(({history, data, asUser}) => {
  const display = [];
  const today = new Date();
  const uniqueExp = new Set();
  
  for (let i = 0; i < data.length; i++){
    
    if (new Date(data[i].date >= today)){
      
      if (!uniqueExp.has(data[i].experience_id)){

        uniqueExp.add(data[i].experience_id);
        display.push((
          <div className='item' key={keygen()}>
            <div className="right floated content">
              { asUser ?
               (<Fragment>
                 <button 
                    className="ui mini button basic green content fixedButton desktop"
                    onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}  
                  >View</button>
                  <button 
                    className="ui mini icon button basic green content mobile"
                    onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}>
                    <i className="eye icon"></i>
                  </button>
                </Fragment>) : 
                (<Fragment>
                  <button 
                    className="ui mini button basic green content fixedButton desktop"
                    onClick={() => {history.push(`/edit_experience/${data[i].experience_id}`)}}  
                  >Edit</button>
                  <button 
                    className="ui mini icon button basic green content mobile"
                    onClick={() => {history.push(`/edit_experience/${data[i].experience_id}`)}}>
                    <i className="edit icon"></i>
                  </button>
                  <button 
                    className="ui mini button basic green content fixedButton desktop"
                    onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}  
                  >View</button>
                  <button 
                    className="ui mini icon button basic green content mobile"
                    onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}>
                    <i className="eye icon"></i>
                  </button>
                </Fragment>)}
            </div>
            <div className="content">
              <Link to={`/experience/${data[i].experience_id}`}>
                <h3 className='truncate topMargin4px'>{data[i].title}</h3>
              </Link>
            </div>
          </div>
        ));

      }

      display.push((
        <div key={keygen()} className={`item indentedItem ${i === data.length - 1 ? 'bottomMargin20px' : ''}`}>
          <div className="right floated content">
            { asUser ?
              undefined :
              (<Fragment>
                <button
                  className="ui mini button basic green content desktop"
                  onClick={() => { history.push(`/experience/${data[i].experience_id}`) }}
                >View</button>
                <button 
                  className="ui mini icon button basic green content mobile"
                  onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}>
                  <i className="eye icon"></i>
                </button>
              </Fragment>)
            }
          </div>
          <div className="content">
            <h4 className='topMargin4px'>{data[i].date.substring(0, 10)}</h4>
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
      {!asUser && !data.length ? <div className='ui center aligned container'>
                              <button className='ui button' onClick={() => {history.push('/create_experience')}}>Host Experience</button>
                            </div> : undefined}
    </div>
  );
});
