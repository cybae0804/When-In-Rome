import React, { Component } from 'react';
import './search.css';
import history from '../../history';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        cityjob: '',
        date: '',
        guests: ''
      }
    }
  }

  changeHandler = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  submitBtnHandler = e => {
    e.preventDefault();

    if (this.inputValidation()){
      const { form } = this.state;
      history.push(`/search?cityjob=${form.cityjob}&dates=${form.dates}&guests=${form.guests}`);
    }
  }

  inputValidation = () => {
    //validate this.state.form
    return true;
  }

  landing = (
    <form className="ui form" onSubmit={this.submitBtnHandler}>
      <div className="field">
        <label>City or Job</label>
        <input type="text" name="cityjob" placeholder="Tokyo, Japan" onChange={this.changeHandler} />
      </div>
      <div className='two fields'>
        <div className="field small" id="overrideColumns">
          <label>Dates</label>
          <input type="text" name="date" placeholder="mm/dd/yyyy" onChange={this.changeHandler} />
        </div>
        <div className="field small" id="overrideColumns">
          <label>Guests</label>
          <input type="text" name="guests" placeholder="1 guest" onChange={this.changeHandler} />
        </div>
      </div>
      <button className="fluid ui button positive" type="submit">Search</button>
    </form>
  );

  default = (
    <form className="ui left icon input topMargin" id='searchBar' onSubmit={this.submitBtnHandler}>
      <i className="search link icon" />
      <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} />
    </form>
  );

  search = (
    <form className='ui topMargin'>
      <div id='searchBar' className="ui fluid left icon input" onSubmit={this.submitBtnHandler}>
        <i className="search link icon"/>
        <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} />
      </div>
      <div className='topMargin'>
        <button className="ui inverted green button filterButton">Filter</button>
        <button className="ui inverted green button sortButton">Sort by Date</button>
      </div>
    </form>
  );

  filter = (
    <form className='ui topMargin'>
      <div id='searchBar' className="ui fluid left icon input topMargin" onSubmit={this.submitBtnHandler}>
        <i className="search link icon" />
        <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} />
      </div>
      <div className='topMargin'>
        <button className="ui inverted green button filterButton">Apply</button>
        <button className="ui inverted green button sortButton">Cancel</button>
      </div>
    </form>
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