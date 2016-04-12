import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export default class UserDashboard extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div>User Dashboard</div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

connect()(UserDashboard);
