import React, { Component } from 'react';
import ExperiencePreviewContainer from '../shared/experience_preview_container/experience_preview_container';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import './landing_page.css';

class LandingPage extends Component {
	render() {
		return (
			<div id='landingPage'>
				<Header 
					version="landing" 
					title="When in Rome" 
					logo
				/>
				<ExperiencePreviewContainer
					heading='Explore'
				/>
				<Footer />
			</div>
		);
	}
}

export default LandingPage;
