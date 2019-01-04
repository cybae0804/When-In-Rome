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

  async componentDidMount() {
    try {
      const { data: { experience } } = await axios.get('api/experiences/1');

      this.setState({
        experience,
      });
    } catch (err) {
      console.log(err);
    }
  }

	render() {
    // console.log('render', this.state)
		return (
			<div>
				<Header/>
				<ExperienceDetails 
          {...this.state.experience}
        />
			</div>
		);
	}
}

export default ExperiencePage;
