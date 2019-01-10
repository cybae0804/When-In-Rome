// vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// components
import LandingPage from '../landing_page/landing_page';
import SearchPage from '../search_page/search_page';
import ExperiencePage from '../experience_page/experience_page';
import FilterPage from '../filter_page/filter_page';
import HamburgerMenu from '../shared/hamburger_menu/hamburger_menu';
import DashboardPage from '../dashboard_page/dashboard_page';

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
        <Route path={'/filter/'} component={FilterPage} />
        <Route path={'/hamburger/'} component={HamburgerMenu} />
        <Route path={'/dashboard/'} component={DashboardPage}/>
      </div>
    );
  }
}

export default App;
