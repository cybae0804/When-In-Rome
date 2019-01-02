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
  
  componentDidMount() {
    axios.get('http://localhost:9000/api/experiences')
      .then(res => {
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
