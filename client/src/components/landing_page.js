import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExperiences } from '../actions';
import ExperiencePreviewContainer from './experience_preview_container/experience_preview_container';
import Header from './header';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  async componentDidMount() {
    this.props.getExperiences();
  }

	render() {
		return (
			<div>
				<Header version="landing" title="When in Rome..." />
				<ExperiencePreviewContainer
					heading='Explore'
					experiences={this.props.experiences}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    experiences: state.experience.experiences,
  };
}

export default connect(mapStateToProps, {
  getExperiences,
})(LandingPage);
