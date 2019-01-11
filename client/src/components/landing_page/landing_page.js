import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExperiencePreviewContainer from '../shared/experience_preview_container/experience_preview_container';
import Header from '../shared/header/header';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {
		return (
			<div>
				<Header version="landing" title="When in Rome..." />
				<ExperiencePreviewContainer
					heading='Explore'
				/>
			</div>
		);
	}
}

export default LandingPage;
