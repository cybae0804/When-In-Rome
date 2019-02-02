import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../../shared/input/input';

class LoginForm extends Component {
  state = {
    loginMessage: '',
  }

  handleLogin = async values => {
    const { data: { success }} = await axios.post(`/api/auth-local`, values);

    if (success) {
      this.props.history.push(('/dashboard'));
    } else {
      this.setState({
        loginMessage: 'Invalid email or password',
      });
    }
  }

  render() {
    const { props: { handleSubmit }, handleLogin } = this;

    return (
      <div id="loginForm" className="ui container topMargin96px">
        <div className="centerDiv maxWidth">
          <a href="/oauth/login" className="fluid ui google button">
            <i className="google icon"></i>
            Login with Google
          </a>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="ui form maxWidth centerDiv topMargin24px">
          <Field component={Input} id="email" name="email" label="Email" />
          <Field component={Input} id="password" name="password" label="Password" />
          <p className="errorMessage">{this.state.loginMessage}</p>
          <button className="fluid ui positive button">Sign In</button>
        </form>

        <div className="maxWidth centerDiv topMargin24px">
          <p>Don't have an account?</p>
        </div>
      </div>
    );
  }
}

function validate({ email, password }) {
  const errors = {};

  if (!email) errors.email = 'Please enter email';
  if (!password) errors.password = 'Please enter password';

  return errors;
}

LoginForm = reduxForm({
  form: 'login-form',
  validate,
})(LoginForm);

export default connect(null, {
})(withRouter(LoginForm));
