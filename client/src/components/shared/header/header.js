import React, { Component } from 'react';
import HamburgerButton from './hamburger_button/hamburger_button';
import HamburgerMenu from '../hamburger_menu/hamburger_menu';
import { connect } from 'react-redux';
import NavBar from './nav_bar';
import Search from './search/search';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  
  render() {
    return (
      <div>
        {
          this.props.version === 'landing' ? 
            this.props.auth ? (<a 
              id='desktopLoginLink' 
              href='/oauth/logout'
              className='ui button primary'
            >Log Out</a>)
            :
            (<a 
              id='desktopLoginLink' 
              href='/oauth/login'
              className='ui button primary'
            >Log In / Sign Up</a>)
          : undefined
        }
        <div id='header' className="ui container posRelative vertMargin16px">
          <div className='logoTextContainer'>
            <div className={this.props.logo ? 'logo' : 'dispNone'}/>
            {this.props.title ? <h1 className={`headerText ${this.props.logo ? 'container center aligned ui' : ''}`}>{this.props.title}</h1> : undefined}
          </div>
          <HamburgerMenu
            open={this.state.menuOpen}
            toggle={this.toggleMenu}
          /> 
          <HamburgerButton 
            toggle={this.toggleMenu}
          />
          {this.props.noSearch ? undefined : <Search version={this.props.version} />}
        </div>
        <div id="desktopHeader">
          {this.props.version === 'landing' ?
            <div>
              <div className='ui container'>
                <h1 className='desktopLandingText'>{this.props.title}</h1>
              </div>
              <Search version={this.props.version} />
            </div>
            :
            <NavBar version={this.props.version} noSearch={this.props.noSearch} title={this.props.title}/>
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

export default connect(mapStateToProps)(Header);
