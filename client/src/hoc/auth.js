import React, { Component } from 'react';
import { connect } from 'react-redux';
const { getCookieValue } = require('../helper');

export default (WrappedComponent, props = {}, to = '/login', redirect = false) => {
  class Auth extends Component {
    checkAuth() {
      const { auth } = this.props;
      const session = getCookieValue('session');

      if (auth === redirect && !session) {
        window.location.assign(window.location.origin + to);
      } else {
        return true;
      }
    }

    render() {
      if (this.checkAuth()) {
        return <WrappedComponent {...this.props} {...props} />
      } 

      return null;
    }
  }

  return connect(mapStateToProps)(Auth);
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
  }
}
