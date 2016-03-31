import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router';

import styles from './styles.styl';
import logo from 'assets/logo.svg';

@cssModules(styles)
export class Header extends Component {
  render() {
    return (
      <div styleName="header">
        <img src={logo} styleName="logo" />

        <section styleName="auth-section">
          <Link to="/auth/login" styleName="button">Login</Link>
          <Link to="/auth/sign-up" styleName="button">Sign Up</Link>
        </section>
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect()(Header);
