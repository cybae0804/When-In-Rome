import React from 'react';
import { Route } from 'react-router-dom';
import ExperiencePreviewContainer from './experience_preview_container';
import ExperiencePreview from './experience_preview';
import images from './dummyImages';

const experiences = [
  {  
    id: 1,
    image: images.a,
    activity: 'Fishing',
    occupation: 'fisherman',
    price: 25,
    duration: 'Full Day',
    averageRating: 4.8,
    totalRatings: 12,
  },
  {
    id: 2,
    image: images.b,
    activity: 'Hunting',
    occupation: 'huntsman',
    price: 80,
    duration: 'Full Day',
    averageRating: 4.2,
    totalRatings: 25,
  },
]

// const { id, image, activity, occupation, price, duration, averageRating, totalRatings } = experience;

const App = () => (
  <div>
    {/* <ExperiencePreview 
      id={id}
      image={image}
      activity={activity}
      occupation={occupation}
      price={price}
      duration={duration}
      averageRating={averageRating}
      totalRatings={totalRatings}
    /> */}
    <ExperiencePreviewContainer
      heading="explore"
      experiences={experiences}
    />
    <Route path={'experience/:' } component={ExperiencePreview}/>
  </div>
);

export default App;
