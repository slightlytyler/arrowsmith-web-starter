import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import Options from 'pods/subscription/components/Options';

@cssModules(styles)
export class SubscriptionsSelectPlan extends Component {
  static propTypes = {
    checkout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div styleName="layout">
        <header styleName="header">
          <section styleName="call-to-action">
            Find the plan that's right for you.
          </section>
          <section styleName="reinforcement">
            Priced just right for companies of every size.
          </section>
        </header>
        <Options checkout={this.props.checkout} />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default connect(
  undefined,
  dispatch => ({
    checkout: plan => dispatch(push({
      pathname: '/start-subscription/checkout',
      query: { plan },
    })),
  }),
)(SubscriptionsSelectPlan);
