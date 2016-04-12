import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import moment from 'moment';

import styles from './styles.styl';

@cssModules(styles)
export class SubscriptionViewer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
    plan: PropTypes.string,
    amount: PropTypes.number,
    start: PropTypes.number,
    periodStart: PropTypes.number,
    periodEnd: PropTypes.number,
    fetchSubscription: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchSubscription(this.props.id);
  }

  formatDate = date => moment.unix(date).format('MMM Do YY');

  render() {
    return (
      <div styleName="container">
        <header styleName="header">
          <section>ID: {this.props.id}</section>
          <section
            styleName={
              this.props.status === 'active'
              ? 'status--active'
              : 'status'
            }
          >
            {this.props.status}
          </section>
        </header>
        <div styleName="content">
          <section styleName="row">
            <label styleName="label">Plan</label>
            <div styleName="value">
              {this.props.plan} - ${(this.props.amount / 100).toFixed(2)} a month
            </div>
          </section>
          <section styleName="row">
            <label styleName="label">Current Period</label>
            <div styleName="value">
              {this.formatDate(this.props.periodStart)} - {this.formatDate(this.props.periodEnd)}
            </div>
          </section>
        </div>
        <footer styleName="footer">Subscribed since {this.formatDate(this.props.start)}</footer>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecord } from 'pods/subscriptions/selectors';
import { fetchSubscription } from 'pods/subscriptions/actions';

export default connect(
  state => {
    const id = state.user.subscription;
    const subscription = findRecord(state, state.user.subscription);

    if (subscription) {
      return {
        id,
        status: subscription.status,
        plan: subscription.plan.name,
        amount: subscription.plan.amount,
        start: subscription.start,
        periodStart: subscription.current_period_start,
        periodEnd: subscription.current_period_end,
      };
    }

    return { id };
  },
  dispatch => bindActionCreators({ fetchSubscription }, dispatch)
)(SubscriptionViewer);
