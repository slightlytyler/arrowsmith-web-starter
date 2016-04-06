import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class SignUp extends Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired,
  }

  handleSubmit = () => {
    const { email, name, password } = this.refs;

    this.props.signUp(email.value, password.value, { name: name.value });
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
import { bindActionCreators } from 'redux';
import { userSignUpFlow } from 'pods/user/model';

export default connect(
  undefined,
  dispatch => bindActionCreators({ signUp: userSignUpFlow }, dispatch),
)(SignUp);
