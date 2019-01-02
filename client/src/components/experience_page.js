import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import ExperienceDetails from './experience_details/experience_details';

class ExperiencePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experience: null,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/experiences/1')
      .then(res => {
        this.setState({
          experience: res.data[0],
        })
      }).catch(err => {
        console.log(err);
      })
  }

	render() {
		return (
			<div>
				<Header />
				<ExperienceDetails 
          {...this.state.experience}
        />
			</div>
		);
	}
}

export default ExperiencePage;
