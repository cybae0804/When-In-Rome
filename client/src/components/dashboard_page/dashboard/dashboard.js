import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions';
import axios from 'axios';

// Components
import Upcoming from '../upcoming/upcoming';
import Reservations from '../reservations/reservations';
import ActiveListing from '../active-listing/active-listing';
import History from '../history/history';

import './dashboard.css'

class Dashboard extends Component {
  state = {
    asUser: true
  }

  async componentDidMount() {
    // MAKE THE AXIOS CALL HERE AND SET THE STATE APPROPRIATELY
    const data = await axios.get('/api/booked/');
  }

  toggleStatus = () => {
    this.setState({
      asUser: !this.state.asUser
    });
  }

  render() {
    // WITH DATA FROM COMPONENTDIDMOUNT, SET VARIABLES PROPERLY AND
    // PASS IT DOWN TO COMPONENTS
    
    const upcomingData = this.state.asUser ? 'hello' : 'bye';
    const reservationsData = this.state.asUser ? 'hello' : 'bye';
    const activeListingData = this.state.asUser ? 'hello' : 'bye';
    const historyData = this.state.asUser ? 'hello' : 'bye';

    return (
      <div>
        <div className="ui equal width grid container topMargin">
          <button onClick={this.toggleStatus} className={`ui column button ${this.state.asUser ? '' : 'positive'}`}><h3>As Host</h3></button>
          <button onClick={this.toggleStatus} className={`ui column button ${this.state.asUser ? 'positive' : ''}`}><h3>As User</h3></button>
        </div>
        <Upcoming data={upcomingData} />
        <Reservations data={reservationsData}/>
        <ActiveListing data={activeListingData}/>
        {this.state.asUser ? undefined : <History data={historyData}/> }
      </div>
    );
  }
}

export default connect(null, { getUser })(Dashboard);
