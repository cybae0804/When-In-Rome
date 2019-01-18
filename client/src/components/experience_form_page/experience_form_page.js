import React, { Component } from 'react'
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import ExperienceForm from '../shared/experience_form/experience_form';
import './experience_form_page.css';

class ExperienceFormPage extends Component {
  render() {
    return (
      <div id='experienceFormPage'>
        <Header noSearch title={this.props.title} />
        <ExperienceForm />
        <Footer />
      </div>
    );
  }
}

export default ExperienceFormPage;
