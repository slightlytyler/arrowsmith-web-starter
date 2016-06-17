import React, { Component, PropTypes } from 'react';
import { Spinner } from 'react-portland-ui';
import Form from '../Form';

export class AppointmentsEditor extends Component {
  static propTypes = {
    record: PropTypes.object,
    actions: PropTypes.shape({
      updateRecord: PropTypes.func.isRequired,
      fetchRecord: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    if (!this.props.record) this.props.actions.fetchRecord();
  }

  defaultValue = () => {
    const { record } = this.props;

    if (record) {
      return {
        patientName: record.patientName,
        date: record.date,
        time: record.time,
        groupId: record.groupId,
        providerId: record.providerId,
        remind: record.remind,
      };
    }

    return undefined;
  };

  renderForm = () => {
    const defaultValue = this.defaultValue();

    if (defaultValue) {
      return (
        <Form
          defaultValue={this.defaultValue()}
          onSubmit={this.props.actions.updateRecord}
        />
      );
    }

    return (
      <div className="loading-state">
        <Spinner className="spinner" thin />
      </div>
    );
  };

  render() {
    return (
      <div className="appointments__editor">
        <div className="container--outer">
          <header className="header">Edit Appointment</header>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { findRecord } from 'modules/appointments/selectors';
import { updateRecord, fetchRecord } from 'modules/appointments/actions';

const getId = props => props.params.id;

const idSelector = (state, props) => getId(props);

const recordSelector = createSelector(
  state => state,
  idSelector,
  (state, id) => findRecord(state, id)
);

export default connect(
  createStructuredSelector({ record: recordSelector }),
  (dispatch, props) => () => createStructuredActions({
    updateRecord: attrs => updateRecord(getId(props), attrs),
    fetchRecord: () => fetchRecord(getId(props)),
  }, dispatch)
)(AppointmentsEditor);
