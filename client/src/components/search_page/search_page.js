import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExperiences } from '../../actions';
import ExperiencePreviewContainer from '../shared/experience_preview_container/experience_preview_container';
import Header from '../shared/header/header';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  async componentDidMount() {
    this.props.getExperiences();
  }

	render() {
		return (
			<div>
        <Header version="search" />
				<ExperiencePreviewContainer
					experiences={this.props.experiences}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    experiences: state.experience.experiences,
  };
}

export default connect(mapStateToProps, {
  getExperiences,
})(SearchPage);
