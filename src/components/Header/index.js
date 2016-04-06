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

  state = {
    showUserOptions: false,
  };

  toggleUserOptions = () => {
    this.setState({ showUserOptions: !this.state.showUserOptions });
  }

  renderAvatar() {
    if (this.props.avatarUrl) {
      return <img src={this.props.avatarUrl} styleName="avatar" />;
    }

    return;
  }

  userOptions = () => ([
    {
      label: 'Billing',
      action: () => false,
    },
    {
      label: 'Settings',
      action: () => false,
    },
    {
      label: 'Logout',
      action: this.props.logout,
    },
  ]);

  renderUserOptions() {
    if (this.state.showUserOptions) {
      return (
        <div styleName="menu">
          {this.userOptions().map(this.renderOption)}
        </div>
      );
    }
    return undefined;
  }

  renderOption({ label, action }) {
    return <section key={label} styleName="option" onClick={action}>{label}</section>;
  }

  renderAuthSection() {
    if (this.props.userId) {
      return (
        <section styleName="auth-section" onClick={this.toggleUserOptions}>
          <div styleName="content">
            {this.renderAvatar()}
            <span styleName="name">{this.props.email}</span> <span styleName="caret">&#9660;</span>
          </div>
          {this.renderUserOptions()}
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
import { userLogoutFlow } from 'pods/user/model';

export default connect(
  state => ({
    userId: state.user._id,
    email: state.user.email,
    avatarUrl: state.user.profileImg,
  }),
  dispatch => bindActionCreators({ logout: userLogoutFlow }, dispatch),
)(Header);
