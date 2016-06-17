import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Form,
  Field,
  Input,
  PasswordInput,
  SwitchGroup,
  Button,
  Spinner,
} from 'react-portland-ui';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  email: yup.string().required('is required'),
  password: yup.string().required('is required'),
  groupIds: yup.array().of(yup.string()).min(1, 'must select at least one'),
});

const formDefaults = {
  name: '',
  email: '',
  password: '',
  groupIds: [],
};

export class SignUp extends Component {
  static propTypes = {
    groupOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
    })),
    actions: PropTypes.shape({
      signUp: PropTypes.func.isRequired,
      fetchGroups: PropTypes.func.isRequired,
    }),
  };

  state = {
    loading: true,
  };

  componentWillMount() {
    if (this.props.groupOptions && this.props.groupOptions.length) {
      this.setState({ loading: false });
    } else {
      this.props.actions.fetchGroups();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupOptions && nextProps.groupOptions.length) {
      this.setState({ loading: false });
    }
  }

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
      <Field
        type={SwitchGroup}
        name="groupIds"
        label="Groups"
        options={this.props.groupOptions}
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

  renderLoadingState = () => (
    <div className="loading-state">
      <div className="panel">
        <Spinner className="spinner" thin />
      </div>
    </div>
  );

  renderContent = () => {
    if (this.state.loading) return this.renderLoadingState();
    return this.renderForm();
  };

  render() {
    return (
      <div className="auth">
        <header className="header">
          <section className="primary">Patient Zero</section>
          <section className="secondary">Sign Up</section>
        </header>
        {this.renderContent()}
        <Link to="/login" className="alternate">
          Already have an account? <span className="bold">Login.</span>
        </Link>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { signUp } from 'modules/user/actions';
import { selectors as groupsSelectors, actions as groupsActions } from 'modules/groups';

const groupOptionsSelector = state => {
  const collection = groupsSelectors.findCurrentCollection(state);

  if (collection) {
    const records = groupsSelectors.findRecords(state, collection.ids);

    return records.map(record => ({
      value: record.id,
      label: record.name,
    }));
  }

  return undefined;
};

export default connect(
  createStructuredSelector({ groupOptions: groupOptionsSelector }),
  createStructuredActions({
    signUp,
    fetchGroups: groupsActions.fetchCollection,
  })
)(SignUp);
