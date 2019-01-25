import React, { Component } from 'react';
import HamburgerButton from './hamburger_button/hamburger_button';
import Search from './search/search';
import HamburgerMenu from '../hamburger_menu/hamburger_menu';
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
      <div id='header' className="ui container posRelative vertMargin16px">
        <div className='logoTextContainer'>
          <div className="logo"></div>{this.props.title ? <h1 className='headerText'>{this.props.title}</h1> : undefined}
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
    );
  }
}

export default Header;