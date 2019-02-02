import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../../shared/input/input';

class LoginForm extends Component {
  handleLogin = async values => {
    const res = await axios.post(`/api/auth-local`, values);
    console.log(res);
    // const { data: redirectUrl } = await axios.post(`/api/auth-local`, values);

    // this.props.history.push(redirectUrl);
  }

  render() {
    const { props: { handleSubmit }, handleLogin } = this;

    return (
      <div id="loginForm" className="topMargin72px">
        <form onSubmit={handleSubmit(handleLogin)} className="ui form container">
          <Field component={Input} id="email" name="email" label="Email" />
          <Field component={Input} id="password" name="password" label="Password" />
          <button className="ui positive button">Sign In</button>
        </form>
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
