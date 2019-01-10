import React, { Component } from 'react';
import './hamburger_menu.css';
import { Link } from 'react-router-dom'

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
  }

  user = [
    {
      text: 'Home',
      to: '/'
    },
    {
      text: 'Dashboard',
      to: '/dashboard'
    },
    {
      text: 'Log Out',
      to: '/'
    },
    {
      text: 'About',
      to: '/about'
    },
  ]

  guest = [
    {
      text: 'Home',
      to: '/'
    },
    {
      text: 'Sign Up',
      to: '/'
    },
    {
      text: 'Login',
      to: '/'
    },
    {
      text: 'About',
      to: '/about'
    },
  ]

  render() {
    const open = this.props.open ? ' open' : '';
    return(
      <div className={'ui secondary vertical menu shadow' + open}>
        <i className="massive close icon" onClick={this.props.toggle}/>
        <div className="linksContainer">
          {
            this.props.loggedIn ? 
              this.user.map((item, index) => (<Link className='item' onClick={this.props.toggle} to={item.to} key={index}>{item.text}</Link>)) : 
              this.guest.map((item, index) => (<Link className='item' onClick={this.props.toggle} to={item.to} key={index}>{item.text}</Link>))
          }
        </div>
      </div>
    );
  }
}

export default HamburgerMenu;
