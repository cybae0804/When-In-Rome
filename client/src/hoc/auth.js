import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (WrappedComponent, to = '/oauth/login', redirect = false) => {
  class Auth extends Component {
    checkAuth() {
      if (this.props.auth === redirect) window.location.assign(window.location.origin + to);
    }

    render = () => this.checkAuth() ? <WrappedComponent {...this.props} /> : <div />;
  }

  return connect(mapStateToProps)(Auth);
}

const mapStateToProps = state => ({ auth: state.user.auth });
