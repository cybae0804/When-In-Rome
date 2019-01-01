import React, { Component } from 'react';
import Search from './search';
import ExperiencePreviewContainer from './experience_preview_container';
import Header from './header';

//dummy images
import image1 from '../assets/images/japanfisherman.jpg';
import image2 from '../assets/images/2.jpg';

class LandingPage extends Component {

	experiences = [
		{  
			id: 1,
			image: image1,
			activity: 'Fishing',
			occupation: 'fisherman',
			price: 25,
			duration: 'Full Day',
			averageRating: 4.8,
			totalRatings: 12,
		},
		{
			id: 2,
			image: image2,
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
				<Header version="landing" title="When in Rome..." />
				<ExperiencePreviewContainer
					heading='explore'
					experiences={this.experiences}
				/>
			</div>
		);
	}
}

export default LandingPage;
