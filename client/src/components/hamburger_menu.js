import React, { Component } from 'react';
import '../assets/css/hamburger_menu.css';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
  }

  user = (
    <div className="ui secondary vertical menu">
      <i className="massive close icon"></i>
      <a className="item">
        Home
      </a>
      <a className="item">
        Dashboard
      </a>
      <a className="item">
        Log Out
      </a>
      <a className="item">
        About
      </a>
    </div>
  );

  guest = (
    <div className="ui secondary vertical menu">
      <i className="massive close icon"></i>
      <a className="item">
        Home
      </a>
      <a className="item">
        Sign Up
      </a>
      <a className="item">
        Login
      </a>
      <a className="item">
        About
      </a>
    </div>
  );

  render() {
    return(
      this.props.loggedIn ? this.user : this.guest
    );
  }
}

export default HamburgerMenu;
