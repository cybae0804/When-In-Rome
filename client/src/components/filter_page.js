import React, { Component } from 'react';
import Calendar from 'react-calendar'
import Search from './search';

class FilterPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Search version="filter" />
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
        <Calendar />
      </div>
    );
  }
}

export default FilterPage;
