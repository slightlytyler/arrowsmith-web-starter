import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Form,
  Field,
  Input,
  PasswordInput,
  Button,
} from 'react-portland-ui';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  email: yup.string().required('is required'),
  password: yup.string().required('is required'),
});

const formDefaults = {
  name: '',
  email: '',
  password: '',
};

export class SignUp extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      signUp: PropTypes.func.isRequired,
    }),
  };

  handleValidSubmit = user => this.props.actions.signUp(user);

  renderForm = () => (
    <Form
      schema={formSchema}
      defaultValue={formDefaults}
      onSubmit={this.props.actions.signUp}
      panel
      fluid
    >
      <Field
        type={Input}
        name="name"
        label="Name"
        placeholder="Your name"
      />
      <Field
        type={Input}
        name="email"
        label="Email"
        placeholder="Email address"
      />
      <Field
        type={PasswordInput}
        name="password"
        label="Password"
        placeholder
      />
      <Button
        type="submit"
        className="button"
        fluid
        big
      >
        Sign Up
      </Button>
    </Form>
  );


  render() {
    return (
      <div className="auth">
        <header className="header">
          <section className="primary">Arrowsmith</section>
          <section className="secondary">Sign Up</section>
        </header>
        {this.renderForm()}
        <Link to="/login" className="alternate">
          Already have an account? <span className="bold">Login.</span>
        </Link>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { signUp } from 'modules/user/actions';

export default connect(
  undefined,
  createStructuredActions({ signUp })
)(SignUp);
