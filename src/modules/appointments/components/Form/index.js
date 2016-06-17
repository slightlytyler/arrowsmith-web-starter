import React, { Component, PropTypes } from 'react';
import {
  Form,
  Field,
  Input,
  DateInput,
  ListInput,
  Select,
  CheckboxGroup,
  Button,
} from 'react-portland-ui';
import yup from 'yup';

export class AppointmentsForm extends Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    providerOptions: PropTypes.array,
    providerOptionsLoading: PropTypes.bool.isRequired,
    groupOptions: PropTypes.array,
    groupOptionsLoading: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      fetchProviders: PropTypes.func.isRequired,
      fetchGroups: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    if (!this.props.providerOptions.length) {
      this.props.actions.fetchProviders();
    }

    if (!this.props.groupOptions.length) {
      this.props.actions.fetchGroups();
    }
  }

  formSchema = yup.object({
    patientName: yup.string().required('is required'),
    date: yup.date().required('is required'),
    time: yup.string().required('is required'),
    groupId: yup.string().required('is required'),
    providerId: yup.string().required('is required'),
    remind: yup.object().shape({
      text: yup.bool(),
      email: yup.bool(),
      phone: yup.bool(),
    }),
  });

  formDefaults = {
    patientName: '',
    date: undefined,
    time: undefined,
    groupId: '',
    providerId: '',
    remind: {
      text: true,
      email: false,
      phone: false,
    },
  };

  render() {
    return (
      <Form
        className="appointments__form"
        schema={this.formSchema}
        defaultValue={this.props.defaultValue || this.formDefaults}
        onSubmit={this.props.onSubmit}
        panel
      >
        <Field
          type={Input}
          name="patientName"
          label="Patient Name"
          placeholder
        />
        <Field
          type={DateInput}
          name="date"
          label="Appointment Date"
          placeholder
        />
        <Field
          type={ListInput}
          name="time"
          options={[
            '8:00 AM',
            '11:00 AM',
            '11:30 AM',
            { value: '1:00 PM', label: '1:00 PM' },
            '3:00 PM',
          ]}
          label="Appointment Time"
          placeholder
        />
        <Field
          type={Select}
          name="providerId"
          options={this.props.providerOptions}
          label="Select provider"
          placeholder
          loading={this.props.providerOptionsLoading}
        />
        <Field
          type={Select}
          name="groupId"
          options={this.props.groupOptions}
          label="Select group"
          placeholder
          loading={this.props.groupOptionsLoading}
        />
        <Field
          type={CheckboxGroup}
          name="remind"
          options={[
            { value: 'text', label: 'Text' },
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
          ]}
          label="Remind Options"
        />
        <Button
          className="button"
          type="submit"
          big
        >
          Submit
        </Button>
      </Form>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { selectors as providersSelectors, actions as providersActions } from 'modules/providers';
import { selectors as groupsSelectors, actions as groupsActions } from 'modules/groups';

const createOptionsSelector = selectors => state => {
  const collection = selectors.findCurrentCollection(state);

  if (collection) {
    const records = selectors.findRecords(state, collection.ids);

    return records.map(record => ({
      value: record.id,
      label: record.name,
    }));
  }

  return [];
};

const providerOptionsSelector = createOptionsSelector(providersSelectors);
const groupOptionsSelector = createOptionsSelector(groupsSelectors);

export default connect(
  createStructuredSelector({
    providerOptions: providerOptionsSelector,
    providerOptionsLoading: state => providersSelectors.isLoading(state),
    groupOptions: groupOptionsSelector,
    groupOptionsLoading: state => groupsSelectors.isLoading(state),
  }),
  createStructuredActions({
    fetchProviders: providersActions.fetchCollection,
    fetchGroups: groupsActions.fetchCollection,
  })
)(AppointmentsForm);
