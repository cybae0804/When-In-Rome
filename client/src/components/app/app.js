// vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// components
import LandingPage from '../landing_page/landing_page';
import SearchPage from '../search_page/search_page';
import ExperiencePage from '../experience_page/experience_page';
import DashboardPage from '../dashboard_page/dashboard_page';
import ExperienceFormPage from '../experience_form_page/experience_form_page';

// etc
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/search'} component={SearchPage} />
        <Route path={'/experience/:experience_id'} component={ExperiencePage} />
        <Route path={'/dashboard'} component={DashboardPage}/>
        <Route path={'/create_experience'} render={() => <ExperienceFormPage title="Host Experience" noInitialValues />} />
        <Route path={'/edit_experience/:experience_id'} render={() => <ExperienceFormPage title="Edit Experience" noImage />} />
      </div>
    );
  }
}

export default App;
