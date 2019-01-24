import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions';
import axios from 'axios';

// Components
import Upcoming from '../upcoming/upcoming';
import Reservations from '../reservations/reservations';
import History from '../history/history';

import './dashboard.css'

class Dashboard extends Component {
  state = {
    asUser: true,
    host: {
      dates: [],
      history: []
    },
    user: {
      dates: []
    }
  }

  async componentDidMount() {
    const { data : { result : { host, user} } } = await axios.get('/api/dashboard/');
    
    this.setState({
      host, user
    });
  }

  toggleStatus = () => {
    this.setState({
      asUser: !this.state.asUser
    });
  }

  render() {
    const dateData = this.state.asUser ? this.state.user.dates : this.state.host.dates;

    return (
      <div>
        <div className="ui equal width grid container topMargin">
          <button onClick={this.toggleStatus} className={`ui column button ${this.state.asUser ? '' : 'positive'}`}><h3>As Host</h3></button>
          <button onClick={this.toggleStatus} className={`ui column button ${this.state.asUser ? 'positive' : ''}`}><h3>As User</h3></button>
        </div>
        <Upcoming data={dateData} />
        <Reservations data={dateData}/>
        {this.state.asUser ? undefined : <History data={this.state.host.history}/> }
      </div>
    );
  }
}

export default connect(null, { getUser })(Dashboard);
