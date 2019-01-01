import React, { Component } from 'react';
import Header from './header';
import ExperienceDetails from './experience_details';

class ExperiencePage extends Component {
	render() {
		return (
			<div>
				<Header />
				<ExperienceDetails/>
			</div>
		);
	}
}

export default ExperiencePage;