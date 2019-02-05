import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../../shared/input/input';
import { getUser } from '../../../actions';

class LoginForm extends Component {
  state = {
    loginMessage: '',
  }

  handleLogin = async values => {
    const { data: { success }} = await axios.post(`/auth-local/login`, values);
    const { history, getUser } = this.props;

    if (success) {
      getUser();

      history.push(('/dashboard'));
    } else {
      this.setState({
        loginMessage: 'Invalid email or password',
      });
    }
  }

  render() {
    const { props: { handleSubmit }, handleLogin } = this;

    return (
      <div id="loginForm" className="ui container topMargin72px">
        <div className="centerDiv maxWidth">
          <a href="/oauth/login" className="fluid ui blue button">
            <i className="google icon"></i>
            Login with Google
          </a>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="ui form maxWidth centerDiv topMargin24px">
          <Field component={Input} id="email" name="email" label="Email" />
          <Field component={Input} type="password" id="password" name="password" label="Password" />
          <p className="errorMessage">{this.state.loginMessage}</p>
          <button className="fluid ui positive button">Sign In</button>
        </form>

        <div className="maxWidth centerDiv topMargin24px center">
          <span className="rightMargin16px">Don't have an account?</span>
          <a href="/signup" className="ui green basic button">
            Sign Up
          </a>
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
  getUser,
})(withRouter(LoginForm));
