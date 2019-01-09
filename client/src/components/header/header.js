import React from 'react';
import HamburgerButton from '../hamburger_button/hamburger_button';
import Search from '../search/search';
import './header.css';

export default props => {
  return (
    <div className="ui container posRelative">
      {props.title ? <h1 className='headerText'>{props.title}</h1> : undefined}
      <HamburgerButton />
      <Search version={props.version} />
    </div>
  );
}
