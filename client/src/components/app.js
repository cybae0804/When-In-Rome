// vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

// components
import LandingPage from './landing_page';
import SearchPage from './search_page';
import ExperiencePage from './experience_page';
import FilterPage from './filter_page';

class App extends Component {
  constructor(props) {
    super(props);

    axios.get('http://localhost:9000/api/experiences')
      .then(res => {
        console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Route path={'/'} component={LandingPage} exact />
        <Route path={'/search'} component={SearchPage} />
        <Route path={'/experience/'} component={ExperiencePage} />
        <Route path={'/filter/'} component={FilterPage} />
      </div>
    );
  }
}

export default App;
