import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import ExperienceDetails from './experience_details/experience_details';
import { getExperienceDetails, clearExperienceDetails } from '../../actions';
import './experience_page.css';

class ExperiencePage extends Component {
  componentDidMount() {
    this.getDetails();
  }

  componentWillUnmount() {
    this.props.clearExperienceDetails();
  }

  getDetails = () => {
    const { experience_id } = this.props.match.params;
    
    if (experience_id) {
      this.props.getExperienceDetails(experience_id);
    }
  }

	render() {
		return (
			<div id="experiencePage">
				<Header />
				<ExperienceDetails 
          {...this.props.details} 
          auth={this.props.auth} 
          getDetails={this.getDetails}
        />
        <Footer />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    details: state.experience.details,
    auth: state.user.auth,
  };
}

export default connect(mapStateToProps, {
  getExperienceDetails,
  clearExperienceDetails,
})(ExperiencePage);
