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
      <div>
        <input ref="email" type="email" placeholder="email" />
        <input ref="name" placeholder="Name (optional)" />
        <input ref="password" type="password" placeholder="password" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser } from 'pods/auth/model';

export default connect(
  undefined,
  dispatch => bindActionCreators({ signUpUser }, dispatch),
)(SignUp);
