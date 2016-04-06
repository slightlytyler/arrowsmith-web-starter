import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  handleSubmit = () => {
    const { email, password } = this.refs;

    this.props.login(email.value, password.value);
  }

  render() {
    return (
      <div styleName="auth-container">
        <header styleName="header">Login</header>
        <input
          ref="email"
          type="email"
          styleName="input"
          placeholder="Email"
        />
        <input
          ref="password"
          type="password"
          styleName="input"
          placeholder="Password"
        />
        <button
          styleName="button"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLoginFlow } from 'pods/user/actions';

export default connect(
  undefined,
  dispatch => bindActionCreators({ login: userLoginFlow }, dispatch),
)(Login);
