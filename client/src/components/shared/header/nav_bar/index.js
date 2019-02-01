import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './nav_bar.css';
import { withRouter } from 'react-router-dom';
import Search from '../search/search';

const user = [
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
];

const guest = [
  {
    text: 'Log In / Sign Up',
    to: '/oauth/login',
    link: false,
  },
  {
    text: 'About',
    to: '/about',
    link: true,
  },
];

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
  }
}

export default withRouter(connect(mapStateToProps)(props => (
  <div id="navBar">
    <div className="container ui posRelative">
      <div className='logo2' onClick={()=>{props.history.push('/')}}></div>
      {props.title ? <span className='navBarTitle'>{props.title}</span> : undefined}
      {props.noSearch ? undefined : <Search version={props.version} view='desktop' />}
      <div className='navBarItems'>
        {
          props.auth ? 
            user.map((item, index) => {
              if (item.link) return (<Link className='ui button navBarItem' to={item.to} key={index}>{item.text}</Link>);
              return (<a className='ui button navBarItem' key={index} href={item.to}>{item.text}</a>);
            }) : 
            guest.map((item, index) => {
              if (item.link) return (<Link className='ui button navBarItem' to={item.to} key={index}>{item.text}</Link>);
              return (<a className='ui button navBarItem' key={index} href={item.to}>{item.text}</a>);
            })
        }
      </div>
    </div>
  </div>
)));
