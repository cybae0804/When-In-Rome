import React from 'react';
import HamburgerButton from './hamburger_button';
import Search from './search';

export default props => {
  return (
    <div className="header ui container">
      <h1>{props.title}</h1>
      {/* <div className="fifteen wide column"> */}
        <Search version={props.version}/>
      {/* </div> */}
      <HamburgerButton />
    </div>
  );
}
