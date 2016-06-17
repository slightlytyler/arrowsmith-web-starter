import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Field, Input, PasswordInput, Button } from 'react-portland-ui';
import yup from 'yup';
import profileIcon from 'icons/profile.svg';
import lockIcon from 'icons/lock.svg';

const formSchema = yup.object({
  email: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const formDefaults = {
  email: '',
  password: '',
};

export class Login extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }),
  };

  handleValidSubmit = user => this.props.actions.login(user.email, user.password);

  render() {
    return (
      <div className="auth">
        <header className="header">
          <section className="primary">Arrowsmith</section>
          <section className="secondary">Login</section>
        </header>

        <section className="panel">
          <Form
            schema={formSchema}
            defaultValue={formDefaults}
            onSubmit={this.props.actions.login}
            fluid
          >
            <Field
              type={Input}
              name="email"
              placeholder="Email"
              icon={profileIcon}
            />
            <Field
              type={PasswordInput}
              name="password"
              placeholder="Password"
              icon={lockIcon}
            />
            <Button
              type="submit"
              className="button"
              fluid
              big
            >
              Login
            </Button>
          </Form>
        </section>

        <Link to="/sign-up" className="alternate">
          Don't have an account? <span className="bold">Sign up.</span>
        </Link>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { login } from 'modules/user/actions';

export default connect(
  undefined,
  createStructuredActions({ login })
)(Login);
