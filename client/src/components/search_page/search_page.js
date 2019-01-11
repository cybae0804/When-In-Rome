import React, { Component } from 'react';
import ExperiencePreviewContainer from '../shared/experience_preview_container/experience_preview_container';
import Header from '../shared/header/header';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
			<div>
        <Header version="search" />
				<ExperiencePreviewContainer />
			</div>
		);
	}
}

export default SearchPage;
