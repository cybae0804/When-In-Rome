import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (WrappedComponent, props = {}, to = '/oauth/login', redirect = false) => {
  class Auth extends Component {
    checkAuth() {
      const { auth } = this.props;
      
      if (auth === redirect) {
        window.location.assign(window.location.origin + to);
      } else {
        return true;
      }
    }

    render() {
      if (this.checkAuth()) return <WrappedComponent {...this.props} {...props} />;
    }
  }

  return connect(mapStateToProps)(Auth);
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
  }
}
