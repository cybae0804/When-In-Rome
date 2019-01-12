import React, { Component } from 'react';
import Calendar from '../shared/calendar/calendar'
import Header from '../shared/header/header';

class FilterPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      range: this.range,
      
    }
  }

  getRange = (range) => {
    const dateRange = (range.map(date=>date.toLocaleDateString()));
    this.setState({
      range: dateRange
    })
    return dateRange
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
        <Calendar
          selectRange 
          returnValue="range" 
          onChange={
            (range) => console.log("Filter Page Range", this.getRange(range))}
        />
      </div>
    );
  }
}

export default FilterPage;
