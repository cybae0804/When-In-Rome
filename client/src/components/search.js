import React, { Component } from 'react';
import '../assets/css/search.css';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  landing = (
    <form className="ui form">
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
  );

  default = (
    <div className="ui left icon input container">
      <i className="search link icon" />
      <input type="text" placeholder="Osaka, Japan" />
    </div>
  );

  search = (
    <div className='ui container'>
      <div className="ui fluid left icon input">
        <i className="search link icon"/>
        <input type="text" placeholder="Osaka, Japan"/>
      </div>
      <div>
        <button className="ui inverted green button filterButton">Filter</button>
        <button className="ui inverted green button sortButton">Sort by Date</button>
      </div>
    </div>
  );

  filter = (
    <div className='ui container'>
      <div className="ui fluid left icon input">
        <i className="search link icon" />
        <input type="text" placeholder="Osaka, Japan" />
      </div>
      <div>
        <button className="ui inverted green button filterButton">Apply</button>
        <button className="ui inverted green button sortButton">Cancel</button>
      </div>
    </div>
  );

  render() {
    switch(this.props.version) {
      case 'landing':
        return this.landing;
      case 'search':
        return this.search;
      case 'filter':
        return this.filter;
      default:
        return this.default;
    }
  }
}

export default Search;