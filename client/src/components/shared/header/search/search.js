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
      dateOpen: false,
      sortOpen: false,
      calendarValue: null,
      form: {
        cityjob: '',
        dateStart: '',
        dateEnd: '',
        guests: '',
        priceMin: 0,
        priceMax: 0,
        by: null,
        desc: false
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
    this.setState({
      filterOpen: true,
      dateOpen: false,
      sortOpen: false
    });
  }

  applyBtnHandler = e => {
    this.setState({
      filterOpen: false,
      form: {
        ...this.state.form,
        ...this.state.pre
      }
    }, this.updateUrl);
  }

  cancelBtnHandler = e => {
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
    this.setState({
      sortOpen: !this.state.sortOpen,
      dateOpen: false,
      filterOpen: false
    });
  }

  sortItemHandler = name => {
    if (name === this.state.form.by){
      this.setState({
        sortOpen: false,
        form: {
          ...this.state.form,
          desc: !this.state.form.desc
        }
      }, this.updateUrl);
    } else {
      this.setState({
        sortOpen: false,
        form: {
          ...this.state.form,
          by: name,
          desc: false
        }
      }, this.updateUrl);
    }
  }

  confirmBtnHandler = e => {
    this.setState({
      dateOpen: false,
      form: {
        ...this.state.form,
        dateStart: this.state.pre.dateStart, 
        dateEnd: this.state.pre.dateEnd
      }
    });
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

  clearBtnHandler = () => {
    this.setState({
      calendarValue: new Date(),
      form: {
        ...this.state.form, 
        dateStart: null,
        dateEnd: null
      },
      pre: {
        ...this.state.pre,
        dateStart: null,
        dateEnd: null
      },
    }, () => {
      this.setState({
        calendarValue: null
      });
    });

    
  }

  updateUrl = () => {
    if (this.inputValidation()){
      const { form } = this.state;
      let narrowDownQuery = '?';

      for (let field in form){
        if (form[field]) narrowDownQuery += `${field}=${form[field]}&`
      }

      const l = narrowDownQuery.length-1;
      if (narrowDownQuery[l] === '&') narrowDownQuery = narrowDownQuery.substring(0, l);

      this.props.history.push(`/search${narrowDownQuery}`);
      this.props.getExperiences(queryString(narrowDownQuery));
    }
  }

  search = () => (
    <form id='search' className='ui form posRelative' onSubmit={this.submitBtnHandler}>
      <div className="ui fluid left icon input" onSubmit={this.submitBtnHandler}>
        <i className="search link icon"/>
        <input 
          type="text" 
          name="cityjob" 
          placeholder="Osaka, Japan" 
          onChange={this.changeHandler} 
          value={this.state.form.cityjob}
        />
      </div>
      <div className={this.state.filterOpen ? 'dispNone' : 'topMargin4px'}>
        <button type='button' className="ui positive button filterButton" onClick={this.filterBtnHandler}>Filter</button>
        <button type='button' className="ui positive button sortButton" onClick={this.sortBtnHandler}>
          {this.state.form.by === null ? 'Sort by...' : 
          this.state.form.desc ? <div>Sorting by {this.state.form.by} <i className="arrow down icon"></i></div> :
          <div>Sorting by {this.state.form.by} <i className="arrow up icon"></i></div>}
        </button>
        <div className={`sortDrop shadow ${this.state.sortOpen ? '' : ' dispNone'}`}>
          <div className="space12px"></div>
          <button 
            type='button' 
            className="ui fluid button dropButton" 
            onClick={() => {this.sortItemHandler('price')}}
          ><span className='marginRight7px'>Price</span>{this.state.form.by === 'price' && !this.state.form.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
          <div className="space12px divider ui"></div>
          <button 
            type='button' 
            className="ui fluid button dropButton"
            onClick={(e) => {this.sortItemHandler('rating')}}
          ><span className='marginRight5px'>Rating</span> {this.state.form.by === 'rating' && !this.state.form.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
          <div className="space12px divider ui"></div>
          <button
            type='button' 
            className="ui fluid button dropButton" 
            onClick={() => {this.sortItemHandler('date')}}
          ><span className='marginRight5px'>Date</span> {this.state.form.by === 'date' && !this.state.form.desc ? <i className="arrow down icon"/> : <i className="arrow up icon"/>}</button>
          <div className="space12px"></div>
        </div>
      </div>
      <div className={this.state.filterOpen ? 'topMargin4px' : 'dispNone'}>
        <button 
          type='button' 
          className="ui positive button filterButton" 
          onClick={this.applyBtnHandler}
        >
          Apply
        </button>
        <button 
          type='button' 
          className="ui button sortButton" 
          onClick={this.cancelBtnHandler}
        >Cancel</button>
      </div>
      <div className={`filterDrop ${this.state.filterOpen ? '' : 'dispNone'}`}>
        <div className='two fields'>
          <div className="field small" id="overrideColumns">
            <label>Group Size</label>
            <input 
              type="text" 
              name="guests" 
              placeholder='Number of Guests' 
              onChange={this.filterChangeHandler} 
            />
          </div>
          <div className="field small" id="overrideColumns">
            <label>Price</label>
            <div className="two fields">
              <div className="field small" id="overrideColumns">
                <input 
                  type="text" 
                  placeholder='Min' 
                  name='priceMin' 
                  onChange={this.filterChangeHandler} 
                />
              </div>
              <div className="field small" id="overrideColumns">
                <input 
                  type="text" 
                  placeholder='Max' 
                  name='priceMax' 
                  onChange={this.filterChangeHandler} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Dates</label>
          <input readOnly 
            className = 'widthAdjust marginRight14px'
            type="text" 
            name="date" 
            placeholder="mm/dd/yyyy" 
            onFocus={() => {this.setState({dateOpen: true})}}
            value={ this.state.pre.dateStart && this.state.pre.dateEnd ? `${this.state.pre.dateStart} to ${this.state.pre.dateEnd}` : ''}
          />
          <button 
              type='button' 
              className='ui button '
              onClick={this.clearBtnHandler}
            >Clear</button>
          <div className={this.state.dateOpen ? '' : 'dispNone'}>
            <Calendar
              selectRange 
              returnValue="range"
              value={this.state.calendarValue} 
              onChange={this.calendarChangeHandler}
            />
          </div>
        </div>
      </div>
      <input type="submit" className='dispNone'/>
    </form>
  );

  landing = () => (
    <form className="ui form" onSubmit={this.submitBtnHandler}>
      <div className="field">
        <label>City or Job</label>
        <input 
          type="text" 
          name="cityjob" 
          placeholder="Tokyo, Japan" 
          onChange={this.changeHandler} 
          value={this.state.form.cityjob}
        />
      </div>
      <div className='two fields'>
        <div className="field small" id="overrideColumns">
          <label>Dates</label>
          <input readOnly 
            type="text" 
            name="date" 
            placeholder="mm/dd/yyyy" 
            onChange={this.changeHandler}
            onFocus={() => {this.setState({dateOpen: true})}}
            value={ this.state.form.dateStart && this.state.form.dateEnd ? `${this.state.form.dateStart} to ${this.state.form.dateEnd}` : ''}
          />
        </div>
        <div className="field small" id="overrideColumns">
          <label>Guests</label>
          <input 
            type="text" 
            name="guests" 
            placeholder="5 guests" 
            onChange={this.changeHandler} 
            value={this.state.form.guests}
          />
        </div>
      </div>
      <div className={`field filterDrop ${this.state.dateOpen ? '' : 'dispNone'}`}>
        <label>Please select a range</label>
        <Calendar
          selectRange 
          value={this.state.calendarValue}
          returnValue="range" 
          onChange={this.calendarChangeHandler}
        />
        <div className="space12px"></div>
        <button 
          type='button' 
          className='ui button positive'
          onClick={this.confirmBtnHandler}
        >Confirm</button>
        <button 
          type='button' 
          className='ui button'
          onClick={this.clearBtnHandler}
        >Clear</button>
        <button 
          type='button' 
          className='ui button'
          onClick={() => {this.setState({dateOpen: false})}}
        >Cancel</button>
        <div className="space24px"></div>
      </div>
      <button className="fluid ui button positive" type="submit">Search</button>
    </form>
  );

  default = () => (
    <form id='search' className="ui left icon input" onSubmit={this.submitBtnHandler}>
      <i className="search link icon" />
      <input 
        type="text" 
        name="cityjob" 
        placeholder="Osaka, Japan" 
        onChange={this.changeHandler} 
        value={this.state.form.cityjob}
      />
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
