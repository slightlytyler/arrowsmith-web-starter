import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

export class NotificationsRoot extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      pull: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    const { addNotification, removeNotification } = this.refs.notificationSystem;
    this.addNotification = addNotification;
    this.removeNotification = removeNotification;
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps;

    if (notifications.length) {
      notifications.forEach(notification => {
        this.addNotification(notification);
        this.props.actions.pull(notification.uid);
      });
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'utils';
import { pull } from 'modules/notifications/actions';

const notificationsSelector = state => state.notifications;

export default connect(
  createStructuredSelector({ notifications: notificationsSelector }),
  createStructuredActions({ pull })
)(NotificationsRoot);
