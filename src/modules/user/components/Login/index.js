import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { Form } from 'formsy-react';
import Input from 'components/Input';
import styles from './styles.styl';

@cssModules(styles)
export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  handleValidSubmit = user => this.props.login(user.email, user.password);

  render() {
    return (
      <div styleName="auth-container">
        <Form onValidSubmit={this.handleValidSubmit}>
          <header styleName="header">Login</header>
          <Input
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            styleName="button"
          >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from 'modules/user/actions';

export default connect(
  undefined,
  dispatch => bindActionCreators({ login: loginUser }, dispatch),
)(Login);
