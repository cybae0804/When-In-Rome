import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import ExperienceDetails from './experience_details/experience_details';
import { getExperienceDetails } from '../../actions';
import './experience_page.css';

class ExperiencePage extends Component {
  submit = form => {
    this.props.history.push(`/search?cityjob=${form.cityjob}`);
  }

  componentDidMount() {
    this.props.getExperienceDetails(this.props.experience_id);
  }

	render() {
		return (
			<div id='experiencePage'>
				<Header />
				<ExperienceDetails 
          {...this.props.details}
        />
        <Footer />
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
