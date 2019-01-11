import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExperiences } from '../../../actions';
import ExperiencePreview from './experience_preview/experience_preview';
import './experience_preview_container.css'

class ExperiencePreviewContainer extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.getExperiences();
  }

  render() {
    const { heading, experiences } = this.props;
    const headingText = heading ? <h2>{heading}</h2> : '';
    const experienceList = experiences.map(experience => {
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

export default connect(mapStateToProps, {
  getExperiences,
})(ExperiencePreviewContainer);
