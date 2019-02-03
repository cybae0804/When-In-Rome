import React, { Component } from 'react';
import LoginForm from './login_form/login_form';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';

class LoginPage extends Component {
  render() {
    return (
      <div id="loginPage">
        <Header title="Sign In" noSearch />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}

export default LoginPage;
