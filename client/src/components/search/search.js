import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './search.css';
import { queryString } from '../../helper';

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

  componentDidMount = () => {
    this.setState({
      form: {
        ...this.state.form,
        ...queryString(this.props.location.search)
      }
    });
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
      const datesString = form.date === '' ? '' : `&date=${form.date}`;
      const guestsString = form.guests === '' ? '' : `&guests=${form.guests}`;
      this.props.history.push(`/search?cityjob=${form.cityjob}${datesString}${guestsString}`);
    }
  }

  inputValidation = () => {
    //validate this.state.form
    return true;
  }

  landing = () => (
    <form className="ui form" onSubmit={this.submitBtnHandler}>
      <div className="field">
        <label>City or Job</label>
        <input type="text" name="cityjob" placeholder="Tokyo, Japan" onChange={this.changeHandler} value={this.state.form.cityjob}/>
      </div>
      <div className='two fields'>
        <div className="field small" id="overrideColumns">
          <label>Dates</label>
          <input type="text" name="date" placeholder="mm/dd/yyyy" onChange={this.changeHandler} value={this.state.form.date}/>
        </div>
        <div className="field small" id="overrideColumns">
          <label>Guests</label>
          <input type="text" name="guests" placeholder="1 guest" onChange={this.changeHandler} value={this.state.form.guests}/>
        </div>
      </div>
      <button className="fluid ui button positive" type="submit">Search</button>
    </form>
  );

  default = () => (
    <form id='search' className="ui left icon input" onSubmit={this.submitBtnHandler}>
      <i className="search link icon" />
      <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} value={this.state.form.cityjob}/>
    </form>
  );

  search = () => (
    <form id='search' className='ui'>
      <div className="ui fluid left icon input" onSubmit={this.submitBtnHandler}>
        <i className="search link icon"/>
        <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} value={this.state.form.cityjob}/>
      </div>
      <div className='topMargin4px'>
        <button className="ui inverted green button filterButton">Filter</button>
        <button className="ui inverted green button sortButton">Sort by Date</button>
      </div>
    </form>
  );

  filter = () => (
    <form id='search' className='ui'>
      <div id='searchBar' className="ui fluid left icon input" onSubmit={this.submitBtnHandler}>
        <i className="search link icon" />
        <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} value={this.state.form.cityjob}/>
      </div>
      <div className='topMargin4px'>
        <button className="ui inverted green button filterButton">Apply</button>
        <button className="ui inverted green button sortButton">Cancel</button>
      </div>
    </form>
  );

  render() {
    switch(this.props.version) {
      case 'landing':
        return this.landing();
      case 'search':
        return this.search();
      case 'filter':
        return this.filter();
      default:
        return this.default();
    }
  }
}

export default withRouter(Search);
