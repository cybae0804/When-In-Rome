import React from 'react';
import ExperiencePreview from './experience_preview';
import './experience_preview_container.css'

export default props => {
  const { heading, experiences } = props;
  const headingText = heading ? <h2>{heading}</h2> : '';
  const experienceList = experiences.map(experience => {
    const { id, image, activity, occupation, price, duration, averageRating, totalRatings } = experience;

    return (
      <ExperiencePreview 
        key={id}
        id={id}
        image={image}
        activity={activity}
        occupation={occupation}
        price={price}
        duration={duration}
        averageRating={averageRating}
        totalRatings={totalRatings}
      />
    );
  });

  return (
    <div className="experience-preview-container">
      <div className="experience-preview-container-header">
        {headingText}
      </div>
      <div className="ui grid container two column">
        {experienceList}
      </div>
    </div>
  );
}
