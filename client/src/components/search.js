import React, { Component } from 'react';
import '../assets/css/search.css';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  landing = (
    <form className="ui form container">
      <div className="field">
        <label>City or Job</label>
        <input type="text" name="cityjob" placeholder="Tokyo, Japan"/>
      </div>
      <div className='two fields'>
        <div className="field small">
          <label>Dates</label>
          <input type="text" name="date" placeholder="mm/dd/yyyy"/>
        </div>
        <div className="field small">
          <label>Guests</label>
          <input type="text" name="guests" placeholder="1 guest"/>
        </div>
      </div>
      <button className="fluid ui button positive" type="submit">Search</button>
    </form>
  )

  default = (
    <div className="ui fluid left icon input container">
      <i className="search link icon"/>
      <input type="text" placeholder="Osaka, Japan"/>
    </div>
  )

  filter = (
    <div className='ui container'>
      <div className="ui fluid left icon input">
        <i className="search link icon"/>
        <input type="text" placeholder="Osaka, Japan"/>
      </div>
      <div>
        <button className="ui inverted green button filterButtn">Filter</button>
        <button className="ui inverted green button sortButton">Sort by Date</button>
      </div>
    </div>
  )

  render() {
    return this.props.landing ? this.landing : this.props.filter ? this.filter : this.default;
  }
}

export default Search;