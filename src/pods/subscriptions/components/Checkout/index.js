import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class SubscriptionsCheckout extends Component {
  static propTypes = {
    createSubscription: PropTypes.func.isRequired,
  };

  createSubscription = () => this.props.createSubscription();

  render() {
    return (
      <div>
        <button onClick={this.createSubscription}>Test Checkout</button>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSubscriptionFlow } from 'pods/subscriptions/actions';

export default connect(
  undefined,
  dispatch => bindActionCreators({ createSubscription: createSubscriptionFlow }, dispatch),
)(SubscriptionsCheckout);
