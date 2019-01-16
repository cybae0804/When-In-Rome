import React, { Component } from 'react';
import Calendar from '../../calendar/calendar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './search.css';
import { queryString } from '../../../../helper';
import { getExperiences } from '../../../../actions/index';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOpen: false,
      range: null,
      form: {
        cityjob: '',
        dateStart: '',
        dateEnd: '',
        guests: '',
        priceMin: 0,
        priceMax: 0
      },
      pre: {
        dateStart: null,
        dateEnd: null,
        guests: 0,
        priceMin: 0,
        priceMax: 0
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
    this.updateUrl();    
  }

  filterChangeHandler = e => {
    this.setState({
      pre: {
        ...this.state.pre,
        [e.target.name]: e.target.value
      }
    });
  }

  filterBtnHandler = e => {
    e.preventDefault();

    this.setState({
      filterOpen: true
    });
  }

  applyBtnHandler = e => {
    e.preventDefault();

    this.setState({
      filterOpen: false,
      form: {
        ...this.state.form,
        ...this.state.pre
      }
    }, this.updateUrl);
  }

  cancelBtnHandler = e => {
    e.preventDefault();

    this.setState({
      filterOpen: false,
      pre: {
        dateStart: null,
        dateEnd: null,
        guests: 0,
        priceMin: 0,
        priceMax: 0
      }
    });
  }

  sortBtnHandler = e => {
    e.preventDefault();
  }

  calendarChangeHandler = range => {
    const [dateStart, dateEnd] = range.map( date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    this.setState({
      pre: {
        dateStart, dateEnd
      }
    });
  }

  inputValidation = () => {
    //validate this.state.form
    return true;
  }

  updateUrl = () => {
    if (this.inputValidation()){
      const { form } = this.state;
      let narrowDownQuery = '?';

      for (let field in form){
        if (form[field]) narrowDownQuery += `${field}=${form[field]}&`
      }

      this.props.history.push(`/search${narrowDownQuery}`);
      this.props.getExperiences(queryString(narrowDownQuery));
    }
  }

  search = () => (
    <form id='search' className='ui form' onSubmit={this.submitBtnHandler}>
      <div className="ui fluid left icon input" onSubmit={this.submitBtnHandler}>
        <i className="search link icon"/>
        <input type="text" name="cityjob" placeholder="Osaka, Japan" onChange={this.changeHandler} value={this.state.form.cityjob}/>
      </div>
      <div className={this.state.filterOpen ? 'dispNone' : 'topMargin4px'}>
        <button type='button' className="ui inverted green button filterButton" onClick={this.filterBtnHandler}>Filter</button>
        <button type='button' className="ui inverted green button sortButton" onClick={this.sortBtnHandler}>Sort by Date</button>
      </div>
      <div className={this.state.filterOpen ? 'topMargin4px' : 'dispNone'}>
        <button type='button' className="ui inverted green button filterButton" onClick={this.applyBtnHandler}>Apply</button>
        <button type='button' className="ui inverted red button sortButton" onClick={this.cancelBtnHandler}>Cancel</button>
      </div>
      <div className={`filterDrop${this.state.filterOpen ? '' : ' dispNone'}`}>
        <div className="ui form container">
          <label>Group Size</label>
          <div className="fields">
            <div className="field">
              <input type="text" placeholder="Number of Guests" name='guests' onChange={this.filterChangeHandler}/>
            </div>
          </div>
          <label>Price</label>
          <div className="inline fields">
            <div className="field">
              <input type="text" placeholder="Min" name='priceMin' onChange={this.filterChangeHandler}/>
            </div>
            <div className="field">
              <input type="text" placeholder="Max" name='priceMax' onChange={this.filterChangeHandler}/>
            </div>
          </div>
        </div>
        <Calendar
          selectRange 
          returnValue="range" 
          onChange={this.calendarChangeHandler}
        />
      </div>
      <input type="submit" className='dispNone'/>
    </form>
  );

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

  render() {
    switch(this.props.version) {
      case 'landing':
        return this.landing();
      case 'search':
        return this.search();
      default:
        return this.default();
    }
  }
}

export default withRouter(connect(null, {getExperiences})(Search));