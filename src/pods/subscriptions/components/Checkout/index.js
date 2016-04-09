import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class SubscriptionsCheckout extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        Chckout
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect(
  state => ({ user: state.user.id }),
)(SubscriptionsCheckout);
