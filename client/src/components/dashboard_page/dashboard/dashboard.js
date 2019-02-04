import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../../actions';
import axios from 'axios';

// Components
import Upcoming from '../upcoming/upcoming';
import Reservations from '../reservations/reservations';
import History from '../history/history';

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

  componentDidMount() {
    this.mounted = true;

    const redirectUrl = localStorage.getItem('redirectUrl');
    
    if (redirectUrl) {
      localStorage.removeItem('redirectUrl');

      this.props.history.push(redirectUrl);
    } else {
      this.getServerData();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getServerData = async () => {
    const { data : { result : { host, user} } } = await axios.get('/api/dashboard/');
    
    if (this.mounted) {
      this.setState({
        host, user
      });
    }
  }

  toUser = () => {
    this.setState({
      asUser: true
    });
  }

  toHost = () => {
    this.setState({
      asUser: false
    });
  }

  render() {
    const dateData = this.state.asUser ? this.state.user.dates : this.state.host.dates;
    const { asUser } = this.state;
   
    return (
      <div>
        <div className="ui equal width grid container topMargin">
          <button onClick={this.toHost} className={`ui column button ${this.state.asUser ? '' : 'positive'}`}><h3>As Host</h3></button>
          <button onClick={this.toUser} className={`ui column button ${this.state.asUser ? 'positive' : ''}`}><h3>As User</h3></button>
        </div>
        <Upcoming data={dateData} asUser={asUser} />
        <Reservations data={dateData} asUser={asUser} getServerData={this.getServerData}/>
        {this.state.asUser ? undefined : <History data={this.state.host.history}/> }
      </div>
    );
  }
}

export default connect(null, { getUser })(withRouter(Dashboard));
