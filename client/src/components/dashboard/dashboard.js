import React from 'react';

// Components
import Upcoming from './upcoming';
import Reservations from './reservations';
import ActiveListing from './active-listing';
import History from './history';
import Header from '../header/header';

import './dashboard.css'

export default props => {
  console.log(props)
  return(
    <div>
      <Header noSearch title='Dashboard'/>
      <div className="ui equal width grid container topMargin">
        <button className="ui column button"><h3>As Host</h3></button>
        <button className="ui column button"><h3>As User</h3></button>
      </div>
      <Upcoming/>
      <Reservations/>
      <ActiveListing/>
      <History/>
    </div>
  );
}