import React from 'react';
import ExperiencePreview from '../experience_preview/experience_preview';
import './experience_preview_container.css'

export default props => {
  const { heading, experiences } = props;
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
