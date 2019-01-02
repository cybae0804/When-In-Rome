import React, { Component } from 'react';
import axios from 'axios';
import Search from './search';
import ExperiencePreviewContainer from './experience_preview_container';
import Header from './header';

//dummy images
import image1 from '../assets/images/japanfisherman.jpg';
import image2 from '../assets/images/2.jpg';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experiences: [],
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:9000/api/experiences')
      .then(res => {
        console.log(res.data);
        this.setState({
          experiences: res.data,
        });
      }).catch(err => {
        console.log(err);
      });
  }

	render() {
		return (
			<div>
				<Header version="landing" title="When in Rome..." />
				<ExperiencePreviewContainer
					heading='explore'
					experiences={this.state.experiences}
				/>
			</div>
		);
	}
}

export default LandingPage;
