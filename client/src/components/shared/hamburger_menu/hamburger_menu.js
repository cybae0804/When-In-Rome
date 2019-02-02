import React, { Component } from 'react';
import { connect } from 'react-redux';
import './hamburger_menu.css';
import { Link } from 'react-router-dom';

class HamburgerMenu extends Component {
  user = [
    {
      text: 'Home',
      to: '/',
      link: true,
    },
    {
      text: 'Dashboard',
      to: '/dashboard',
      link: true,
    },
    {
      text: 'Log Out',
      to: '/oauth/logout',
      link: false,
    },
    {
      text: 'About',
      to: '/about',
      link: true,
    },
  ]

  guest = [
    {
      text: 'Home',
      to: '/',
      link: true,
    },
    {
      text: 'Sign Up',
      to: '/login',
      link: false,
    },
    {
      text: 'Login',
      to: '/login',
      link: false,
    },
    {
      text: 'About',
      to: '/about',
      link: true,
    },
  ]

  render() {
    const open = this.props.open ? ' open shadow' : '';
    return(
      <div className={'ui secondary vertical menu' + open}>
        <i className="massive close icon" onClick={this.props.toggle}/>
        <div className="linksContainer">
          {
            this.props.auth ? 
              this.user.map((item, index) => {
                if (item.link) return (<Link className='item' onClick={this.props.toggle} to={item.to} key={index}>{item.text}</Link>);
                return (<a className='item' key={index} href={item.to}>{item.text}</a>);
              }) : 
              this.guest.map((item, index) => {
                if (item.link) return (<Link className='item' onClick={this.props.toggle} to={item.to} key={index}>{item.text}</Link>);
                return (<a className='item' key={index} href={item.to}>{item.text}</a>);
              })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
  }
}

export default connect(mapStateToProps)(HamburgerMenu);
