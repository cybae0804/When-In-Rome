import React, { Component } from 'react'
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import ExperienceForm from '../shared/experience_form/experience_form';
import './create_experience_page.css';

class CreateExperiencePage extends Component {
  render() {
    return (
      <div id='createExperiencePage'>
        <Header noSearch title='New Experience' />
        <ExperienceForm />
        <Footer />
      </div>
    );
  }
}

export default CreateExperiencePage;
