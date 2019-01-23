import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getExperiences } from '../../../actions';
import ExperiencePreview from './experience_preview/experience_preview';
import './experience_preview_container.css';
import { queryString } from '../../../helper';

class ExperiencePreviewContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const parameters = queryString(this.props.location.search);
    this.props.getExperiences(parameters);
  }

  render() {
    const { heading } = this.props;
    const headingText = heading ? <h2>{heading}</h2> : '';
    const experienceList = this.props.experiences.map(experience => {
      const { id } = experience;
      
      return (
        <ExperiencePreview
          key={id}
          id={id}
          {...experience}
        />
      );
    });

    return (
      <div className="experience-preview-container ui container">
        <div className="experience-preview-container-header">
          {headingText}
        </div>
        <div className="experience-previews">
          {experienceList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiences: state.experience.experiences,
  };
}

export default withRouter(connect(mapStateToProps, {
  getExperiences
})(ExperiencePreviewContainer));
