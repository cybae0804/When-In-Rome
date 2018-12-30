import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
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
];



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    axios.get('http://localhost:9000/api/experiences')
      .then(res => {
        console.log(res);
    }).catch(err => {
      console.log(err);
    });

    return (
      <div>
        <ExperiencePreviewContainer
          heading="explore"
          experiences={experiences}
        />
        <Route path={'experience/:'} component={ExperiencePreview} />
      </div>
    );
  }
}

export default App;
