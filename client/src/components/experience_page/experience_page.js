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
    const { experience_id } = this.props.match.params;
    
    if (experience_id) {
      this.props.getExperienceDetails(experience_id);
    }
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
  return {
    details: state.experience.details,
  };
}

export default connect(mapStateToProps, {
  getExperienceDetails,
})(ExperiencePage);
