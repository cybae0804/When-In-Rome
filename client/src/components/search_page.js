import React, { Component } from 'react';
import axios from 'axios';
import ExperiencePreviewContainer from './experience_preview_container/experience_preview_container';
import Header from './header';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experiences: [],
    }
  }

  submit = form => {
    this.props.history.push(`/search?cityjob=${form.cityjob}`);
  }

  async componentDidMount() {
    try {
      const { data: { experiences } } = await axios.get('api/experiences');

      this.setState({
        experiences,
      });
    } catch (err) {
      console.log(err);
    }
  }

	render() {
		return (
			<div>
        <Header version="search" submit={this.submit}/>
				<ExperiencePreviewContainer
					experiences={this.state.experiences}
				/>
			</div>
		);
	}
}

export default SearchPage;