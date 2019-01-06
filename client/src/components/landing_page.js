import React, { Component } from 'react';
import axios from 'axios';
import ExperiencePreviewContainer from './experience_preview_container/experience_preview_container';
import Header from './header';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experiences: [],
    };
  }
  
  async componentDidMount() {
    try {
      const { data: { experiences } } = await axios.get('api/experiences');

      this.setState({
        experiences,
      });
    } catch(err) {
      console.log(err);
    }
  }

	render() {
		return (
			<div>
				<Header version="landing" title="When in Rome..." />
				<ExperiencePreviewContainer
					heading='Explore'
					experiences={this.state.experiences}
				/>
			</div>
		);
	}
}

export default LandingPage;
