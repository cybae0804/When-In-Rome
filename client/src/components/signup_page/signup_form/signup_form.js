import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../../shared/input/input';

class SignUpForm extends Component {
  state = {
    signUpMessage: '',
  }

  handleSignUp = async values => {
    const { data: result } = await axios.post(`/auth-local/signup`, values);

    if (!result.success) {
      this.setState({
        signUpMessage: result.message,
      });
    } else {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { props: { handleSubmit }, handleSignUp } = this;

    return (
      <div id="loginForm" className="ui container topMargin72px">
        <div className="centerDiv maxWidth">
          <a href="/oauth/login" className="fluid ui blue button">
            <i className="google icon"></i>
            Sign Up with Google
          </a>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="ui form maxWidth centerDiv topMargin24px">
          <Field component={Input} id="email" name="email" label="Email" />
          <Field component={Input} id="password" name="password" label="Password" />
          <Field component={Input} id="firstname" name="firstname" label="First Name" />
          <Field component={Input} id="lastname" name="lastname" label="Last Name" />
          <p className="errorMessage">{this.state.signUpMessage}</p>
          <button className="fluid ui positive button">Sign Up</button>
        </form>
      </div>
    );
  }
}

function validate({ email, password, firstname, lastname}) {
  const errors = {};

  if (!email) errors.email = 'Please enter email';
  if (!password) errors.password = 'Please enter password';
  if (!firstname) errors.firstname = 'Please enter first name';
  if (!lastname) errors.lastname = 'Please enter last name';

  return errors;
}

SignUpForm = reduxForm({
  form: 'signup-form',
  validate,
})(SignUpForm);

export default connect(null, {
})(withRouter(SignUpForm));
