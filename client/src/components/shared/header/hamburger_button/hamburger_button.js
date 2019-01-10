import React from 'react';
import './hamburger_button.css';

export default props => {
  return (<i 
    id="hamburger-button" 
    className='icon bars large'
    onClick={props.toggle}
  />);
}
