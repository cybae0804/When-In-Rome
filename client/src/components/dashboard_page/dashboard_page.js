import React, { Component } from 'react'
import Dashboard from './dashboard/dashboard';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import './dashboard_page.css';

class DashboardPage extends Component{
  render() {
    return (
      <div id='dashboardPage'>
        <Header noSearch title='Dashboard'/>
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default DashboardPage;
