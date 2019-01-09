import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header/header';
import ExperienceDetails from './experience_details/experience_details';
import { getExperienceDetails } from '../actions';

class ExperiencePage extends Component {
  submit = form => {
    this.props.history.push(`/search?cityjob=${form.cityjob}`);
  }

  componentDidMount() {
    this.props.getExperienceDetails(this.props.experience_id);
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

function mapStateToProps(state, ownProps) {
  const { experience_id } = ownProps.match.params; 
  
  return {
    details: state.experience.details,
    experience_id,
  };
}

export default connect(mapStateToProps, {
  getExperienceDetails,
})(ExperiencePage);
