import React, { Component } from 'react';
import Calendar from './calendar/calendar'
import Header from './header/header';

class FilterPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header version="filter" />
        <div className="ui form container">
          <label>Group Size</label>
          <div className="fields">
            <div className="field">
              <input type="text" placeholder="Number of Guests" />
            </div>
          </div>
          <label>Price</label>
          <div className="inline fields">
            <div className="field">
              <input type="text" placeholder="Min" />
            </div>
            <div className="field">
              <input type="text" placeholder="Max" />
            </div>
          </div>
        </div>
        <Calendar/>
      </div>
    );
  }
}

export default FilterPage;
