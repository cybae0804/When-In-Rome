import React, { Component } from 'react';
import ExperiencePreviewContainer from '../shared/experience_preview_container/experience_preview_container';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import './search_page.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
			<div id='searchPage'>
        <Header version="search" />
				<ExperiencePreviewContainer />
				<Footer />
			</div>
		);
	}
}

export default SearchPage;
