import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Header from './header';
import ExperienceDetails from './experience_details/experience_details';
import { getExperience } from '../actions';

class ExperiencePage extends Component {
  submit = form => {
    this.props.history.push(`/search?cityjob=${form.cityjob}`);
  }

  componentDidMount() {
    this.props.getExperience();
  }

	render() {
		return (
			<div>
				<Header />
				<ExperienceDetails 
          {...this.props.details}
        />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    details: state.experience.details,
  };
}

export default connect(mapStateToProps, {
  getExperience,
})(ExperiencePage);
