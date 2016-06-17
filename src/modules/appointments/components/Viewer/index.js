import React, { Component, PropTypes } from 'react';
import { Spinner } from 'react-portland-ui';

export class AppointmentsViewer extends Component {
  static propTypes = {
    record: PropTypes.object,
    actions: PropTypes.shape({
      fetchRecord: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    if (!this.props.record) this.props.actions.fetchRecord();
  }

  renderLoadingState = () => (
    <div className="loading-state">
      <Spinner className="spinner" thin />
    </div>
  );

  renderRecord = () => (
    <div className="details">
      <header className="header">Appointment</header>
      <ul className="list">
        <li className="list">Patient Name: {this.props.record.patientName}</li>
        <li className="list">Date: {this.props.record.date}</li>
        <li className="list">Provider: {this.props.record.providerId}</li>
        <li className="list">Group: {this.props.record.groupId}</li>
      </ul>
    </div>
  );

  renderContent = () => {
    if (this.props.record) return this.renderRecord();
    return this.renderLoadingState();
  };

  render() {
    return (
      <div className="appointments__viewer">
        <div className="container--outer">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { findRecord } from 'modules/appointments/selectors';
import { fetchRecord } from 'modules/appointments/actions';

const getId = props => props.params.id;

const idSelector = (state, props) => getId(props);

const recordSelector = (state, props) => findRecord(state, idSelector(state, props));

export default connect(
  createStructuredSelector({ record: recordSelector }),
  (dispatch, props) => () => createStructuredActions({
    fetchRecord: () => fetchRecord(getId(props)),
  }, dispatch)
)(AppointmentsViewer);
