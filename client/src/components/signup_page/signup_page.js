import React, { Component } from 'react';
import SignUpForm from './signup_form/signup_form';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';

class SignUpPage extends Component {
  render() {
    return (
      <div id="registerPage">
        <Header title="Sign Up" noSearch />
        <SignUpForm />
        <Footer />
      </div>
    );
  }
}

export default SignUpPage;
