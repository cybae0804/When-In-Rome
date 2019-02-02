// vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// components
import LandingPage from '../landing_page/landing_page';
import SearchPage from '../search_page/search_page';
import ExperiencePage from '../experience_page/experience_page';
import DashboardPage from '../dashboard_page/dashboard_page';
import ExperienceFormPage from '../experience_form_page/experience_form_page';
import LoginPage from '../login_page/login_page';
import SignUpPage from '../signup_page/signup_page';
import auth from '../../hoc/auth';

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
        <Route path={'/dashboard'} component={auth(DashboardPage)} />
        <Route path={'/create_experience'} component={auth(ExperienceFormPage, {title: "Host Experience", noInitialValues: true})} />
        <Route path={'/edit_experience/:experience_id'} component={auth(ExperienceFormPage, { title: "Edit Experience", noImage: true })}  />
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/signup'} component={SignUpPage} />
      </div>
    );
  }
}

export default App;
