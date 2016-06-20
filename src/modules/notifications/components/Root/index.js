import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

export class NotificationsRoot extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      shift: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    const { addNotification, removeNotification } = this.refs.notificationSystem;
    this.addNotification = addNotification;
    this.removeNotification = removeNotification;

    const { notifications } = this.props;

    if (notifications.length) this.shiftNotifications(notifications);
  }

  componentWillReceiveProps(nextProps) {
    const { notifications } = nextProps;

    if (notifications.length) this.shiftNotifications(notifications);
  }

  shiftNotifications = notifications => notifications.forEach(notification => {
    this.addNotification(notification);
    this.props.actions.shift(notification.uid);
  });

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
import { createStructuredActions } from 'helpers/actions';
import { getSubstate } from 'modules/notifications/selectors';
import { shift } from 'modules/notifications/actions';

export default connect(
  createStructuredSelector({ notifications: getSubstate }),
  createStructuredActions({ shift })
)(NotificationsRoot);
