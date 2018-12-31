import React, { Component } from 'react';
import Search from './search';
import ExperienceDetails from './experience_details';

class ExperiencePage extends Component {
	render() {
		return (
			<div>
				<Search/>
				<ExperienceDetails/>
			</div>
		);
	}
}

export default ExperiencePage;