import React from 'react';

// Components
import Upcoming from '../upcoming/upcoming';
import Reservations from '../reservations/reservations';
import ActiveListing from '../active-listing/active-listing';
import History from '../history/history';

import './dashboard.css'

export default props => {
  return (
    <div>
      <div className="ui equal width grid container topMargin">
        <button className="ui column button"><h3>As Host</h3></button>
        <button className="ui column button"><h3>As User</h3></button>
      </div>
      <Upcoming />
      <Reservations />
      <ActiveListing />
      <History />
    </div>
  );
}
