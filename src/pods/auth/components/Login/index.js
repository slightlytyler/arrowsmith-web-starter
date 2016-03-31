import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        Login
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLoginFlow } from 'pods/auth/model';

export default connect(
  undefined,
  dispatch => bindActionCreators({ login: userLoginFlow }, dispatch),
)(Login);
