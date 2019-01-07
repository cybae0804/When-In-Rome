// vendor
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// components
import LandingPage from '../landing_page';
import SearchPage from '../search_page';
import ExperiencePage from '../experience_page';
import FilterPage from '../filter_page';
import HamburgerMenu from '../hamburger_menu/hamburger_menu';

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
      </div>
    );
  }
}

export default App;
