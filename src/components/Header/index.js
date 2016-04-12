import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { Link } from 'react-router';

import styles from './styles.styl';
import logo from 'assets/logo.svg';

@cssModules(styles)
export class Header extends Component {
  static propTypes = {
    userIsLoggedIn: PropTypes.bool.isRequired,
    userHasSubscription: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    userAvatarUrl: PropTypes.string,
    logout: PropTypes.func.isRequired,
  }

  state = {
    showUserOptions: false,
  };

  toggleUserOptions = () => {
    this.setState({ showUserOptions: !this.state.showUserOptions });
  }

  userOptions = () => {
    if (this.props.userHasSubscription) {
      return [
        {
          label: 'Subscription',
          link: '/dashboard/subscription',
        },
        {
          label: 'Settings',
          link: '/dashboard/user',
        },
        {
          label: 'Logout',
          action: this.props.logout,
        },
      ];
    }

    return [
      {
        label: 'Start a subscription',
        link: '/start-subscription',
      },
      {
        label: 'Settings',
        link: '/dashboard/user',
      },
      {
        label: 'Logout',
        action: this.props.logout,
      },
    ];
  };

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

  renderOption({ label, link, action }) {
    if (link) {
      return <Link to={link} key={label} styleName="option">{label}</Link>;
    }

    return <section key={label} styleName="option" onClick={action}>{label}</section>;
  }

  renderAvatar() {
    if (this.props.userAvatarUrl) {
      return <img src={this.props.userAvatarUrl} styleName="avatar" />;
    }

    return undefined;
  }

  renderAuthSection() {
    if (this.props.userIsLoggedIn) {
      return (
        <section styleName="auth-section" onClick={this.toggleUserOptions}>
          <div styleName="content">
            {this.renderAvatar()}
            <span styleName="name">
              {this.props.userName}</span> <span styleName="caret">&#9660;
            </span>
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
import { userLogoutFlow } from 'pods/user/actions';

export default connect(
  state => ({
    userIsLoggedIn: !!state.user.id,
    userHasSubscription: !!state.user.subscription,
    userName: state.user.name || state.user.email,
    userAvatarUrl: state.user.profileImg,
  }),
  dispatch => bindActionCreators({ logout: userLogoutFlow }, dispatch),
)(Header);
