import React, { Component, PropTypes } from 'react';
import Form from '../Form';

export class AppointmentsCreator extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      createRecord: PropTypes.func.isRequired,
    }),
  };

  render() {
    return (
      <div className="appointments__creator">
        <div className="container--outer">
          <header className="header">New Appointment</header>
          <Form onSubmit={this.props.actions.createRecord} />
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { createRecord } from 'modules/appointments/actions';

export default connect(
  undefined,
  createStructuredActions({ createRecord })
)(AppointmentsCreator);
