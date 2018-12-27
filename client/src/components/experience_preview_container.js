import React from 'react';
import ExperiencePreview from './experience_preview';

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
        rating={averageRating}
        totalRatings={totalRatings}
      />
    );
  });

  return (
    <div className="experiencePreviewContainer">
      {headingText}
      {experienceList}
    </div>
  );
}
