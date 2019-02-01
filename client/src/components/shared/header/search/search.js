import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './search.css';
import { queryString } from '../../../../helper';
import { getExperiences } from '../../../../actions/index';

// components 
import Default from './default_version';
import Landing from './landing_version';
import SearchV from './search_version';

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

  //when navigating between pages, the search query persists
  componentDidMount = () => {
    this.setState({
      form: {
        ...this.state.form,
        ...queryString(this.props.location.search)
      }
    });
  }

  //calls the search api and updates the url accordingly.
  updateUrl = () => {
    if (this.inputValidation()){
      const { form } = this.state;
      let narrowDownQuery = '?';

      for (let field in form){
        if (form[field]) narrowDownQuery += `${field}=${form[field]}&`
      }

      const l = narrowDownQuery.length-1;
      if (narrowDownQuery[l] === '&') narrowDownQuery = narrowDownQuery.substring(0, l);

      this.props.history.replace(`/search${narrowDownQuery}`);
      this.props.getExperiences(queryString(narrowDownQuery));
    }
  }

  //main form input handler
  changeHandler = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  //calls update url with current input
  submitBtnHandler = e => {
    e.preventDefault();
    this.updateUrl();    
  }

  //updates filter dropdown values
  filterChangeHandler = e => {
    this.setState({
      pre: {
        ...this.state.pre,
        [e.target.name]: e.target.value
      }
    });
  }

  //closes other dropdowns and opens dropdown menu
  filterBtnHandler = e => {
    this.setState({
      filterOpen: true,
      dateOpen: false,
      sortOpen: false
    });
  }

  //used in search page search component to confirm filter options
  applyBtnHandler = e => {
    this.setState({
      filterOpen: false,
      form: {
        ...this.state.form,
        ...this.state.pre
      }
    }, this.updateUrl);
  }

  //clears pre state, and closes the filter menu
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
    }, this.clearBtnHandler);
  }

  //toggles sort dropdown menu
  sortBtnHandler = e => {
    this.setState({
      sortOpen: !this.state.sortOpen,
      dateOpen: false,
      filterOpen: false
    });
  }

  //depending on the current state of sort, changes arrows
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

  //closes calendar dropdown, and updates the form
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

  //extracts calendar select range
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

  //clears calendar selection and the input field. 
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

  render() {
    switch(this.props.version) {
      case 'landing':
        return (<Landing 
          submit={this.submitBtnHandler}
          change={this.changeHandler}
          val={this.state.form}
          
          confirm={this.confirmBtnHandler}
          clear={this.clearBtnHandler}
          open={() => {this.setState({dateOpen: true})}}
          close={() => {this.setState({dateOpen: false})}}
          
          dateOpen={this.state.dateOpen}
          calVal={this.state.calendarValue}
          calChange={this.calendarChangeHandler}
        />);

      case 'search':
        return (<SearchV 
          submit={this.submitBtnHandler}
          change={this.changeHandler}
          val={this.state.form}
          pre={this.state.pre}

          filter={this.filterBtnHandler}
          filterOpen={this.state.filterOpen}
          filterChange={this.filterChangeHandler}

          sort={this.sortBtnHandler}
          sortOpen={this.state.sortOpen}
          sortItemHandler={this.sortItemHandler}

          apply={this.applyBtnHandler}
          clear={this.clearBtnHandler}
          cancel={this.cancelBtnHandler}

          dateOpen={this.state.dateOpen}
          openDate={() => {this.setState({dateOpen: true})}}
          calVal={this.state.calendarValue}
          calChange={this.calendarChangeHandler}
          view={this.props.view}
        />);

      default:
        return (<Default
          submit={this.submitBtnHandler}
          change={this.changeHandler}
          val={this.state.form.cityjob}
          view={this.props.view}
        />);
    }
  }
}

export default withRouter(connect(null, {getExperiences})(Search));
