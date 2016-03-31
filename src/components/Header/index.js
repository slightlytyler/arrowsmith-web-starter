import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router';

import styles from './styles.styl';
import logo from 'assets/logo.svg';

@cssModules(styles)
export class Header extends Component {
  static propTypes = {
    userId: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    logout: PropTypes.func.isRequired,
  }

  showUserOptions = () => {
    this.props.logout();
  }

  renderAuthSection() {
    if (this.props.userId) {
      return (
        <section styleName="auth-section" onClick={this.showUserOptions}>
          <img src={this.props.avatarUrl} styleName="avatar" />&nbsp;
          <span styleName="name">{this.props.email}</span> <span styleName="caret">&#9660;</span>
        </section>
      );
    }

    return (
      <section styleName="auth-section">
        <Link to="/auth/login" styleName="button">Login</Link>
        <Link to="/auth/sign-up" styleName="button">Sign Up</Link>
      </section>
    );
  }

  render() {
    return (
      <div styleName="header">
        <img src={logo} styleName="logo" />
        {this.renderAuthSection()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogoutFlow } from 'pods/auth/model';

export default connect(
  state => ({
    userId: state.auth.uid,
    email: state.auth.password ? state.auth.password.email : undefined,
    avatarUrl: state.auth.password ? state.auth.password.profileImageURL : undefined,
  }),
  dispatch => bindActionCreators({ logout: userLogoutFlow }, dispatch),
)(Header);
