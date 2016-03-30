import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class SignUp extends Component {
  static propTypes = {
    signUpUser: PropTypes.func.isRequired,
  }

  handleSubmit = () => {
    const { email, name, password } = this.refs;

    this.props.signUpUser(email.value, password.value, { name: name.value });
  }

  render() {
    return (
      <div styleName="auth-container">
        <header styleName="header">Sign Up</header>
        <input
          ref="email"
          type="email"
          styleName="input"
          placeholder="Email"
        />
        <input
          ref="name"
          styleName="input"
          placeholder="Name (optional)"
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
import { signUpUser } from 'pods/auth/model';
import { initializeUser } from 'pods/user/model';

export default connect(
  undefined,
  dispatch => ({
    signUpUser: (email, password, payload) => dispatch(
      signUpUser(email, password, payload, () =>
        dispatch(initializeUser())
      )
    ),
  }),
)(SignUp);
