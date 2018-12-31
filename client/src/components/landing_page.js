import React, { Component } from 'react';
import Search from './search';
import ExperiencePreviewContainer from './experience_preview_container';

class LandingPage extends Component {

	experiences = [
		{  
			id: 1,
			// image: images.a,
			activity: 'Fishing',
			occupation: 'fisherman',
			price: 25,
			duration: 'Full Day',
			averageRating: 4.8,
			totalRatings: 12,
		},
		{
			id: 2,
			// image: images.b,
			activity: 'Hunting',
			occupation: 'huntsman',
			price: 80,
			duration: 'Full Day',
			averageRating: 4.2,
			totalRatings: 25,
		},
	];

	render() {
		return (
			<div>
				<Search landing/>
				<ExperiencePreviewContainer
					heading='explore'
					experiences={this.experiences}
				/>
			</div>
		);
	}
}

export default LandingPage;