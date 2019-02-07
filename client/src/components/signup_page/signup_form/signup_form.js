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
          <Field component={Input} type="password" id="password" name="password" label="Password" />
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
  // credit: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  // credit: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
  const validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;
  const validName = /^([a-zA-Z ,.'-]{1,50})$/g;
 
  if (!validEmail.test(email)) errors.email = 'Please enter a valid email';
  if (!validPassword.test(password)) errors.password = 'Password must be between 6 and 32 characters, at least one number and special character';
  if (!firstname || !validName.test(firstname)) errors.firstname = 'Please enter a valid first name less than 50 characters';
  if (!lastname || !validName.test(lastname)) errors.lastname = 'Please enter a valid last name less than 50 characters';

  return errors;
}

SignUpForm = reduxForm({
  form: 'signup-form',
  validate,
})(SignUpForm);

export default connect(null, {
})(withRouter(SignUpForm));
