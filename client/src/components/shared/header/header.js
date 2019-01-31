import React, { Component } from 'react';
import HamburgerButton from './hamburger_button/hamburger_button';
import HamburgerMenu from '../hamburger_menu/hamburger_menu';
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
          {this.props.title ? 
            this.props.version === 'landing' ? 
              <h1 className='desktopLandingText'>{this.props.title}</h1> :
              <h1 className='desktopHeaderText'>{this.props.title}</h1>
          : undefined}
          {this.props.version === 'landing' ? undefined : <NavBar />}
          {this.props.noSearch ? undefined : <Search version={this.props.version} />}
        </div>
      </div>
     
    );
  }
}

export default Header;