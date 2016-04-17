import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { pick } from 'lodash';
import { Form } from 'formsy-react';
import Input from 'components/Input';
import styles from './styles.styl';

@cssModules(styles)
export class SubscriptionsCheckout extends Component {
  static propTypes = {
    plan: PropTypes.string.isRequired,
    createSubscription: PropTypes.func.isRequired,
  };

  cardAttributes = ['number', 'expMonth', 'expYear', 'cvs'];

  addressAttributes = ['addressLine1', 'addressLine2', 'city', 'state', 'zip'];

  handleValidSubmit = billing => {
    const card = pick(billing, this.cardAttributes);
    const address = pick(billing, this.addressAttributes);

    this.props.createSubscription(this.props.plan, card, address);
  };

  render() {
    return (
      <div styleName="form-container">
        <Form onValidSubmit={this.handleValidSubmit}>
            <section styleName="section">
            <header styleName="header">Payment Info</header>
            <div styleName="row">
              <Input
                name="number"
                type="text"
                placeholder="Card Number"
              />
            </div>
            <div styleName="row">
              <Input
                name="expMonth"
                type="text"
                placeholder="Exp. Month"
              />
              <Input
                name="expYear"
                type="text"
                placeholder="Exp. year"
              />
              <Input
                name="cvc"
                type="text"
                placeholder="CVC"
              />
            </div>
          </section>
          <section styleName="section">
            <header styleName="header">Billing Address</header>
            <div styleName="row">
              <Input
                name="addressLine1"
                type="text"
                placeholder="Address Line 1"
              />
            </div>
            <div styleName="row">
              <Input
                name="addressLine2"
                type="text"
                placeholder="Address Line 2"
              />
            </div>
            <div styleName="row">
              <Input
                name="city"
                type="text"
                placeholder="City"
              />
              <Input
                name="state"
                type="text"
                placeholder="State"
              />
              <Input
                name="zip"
                type="text"
                placeholder="Zipcode"
              />
            </div>
          </section>
          <button
            type="submit"
            styleName="button"
          >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSubscription } from 'modules/subscriptions/actions';

export default connect(
  (state, props) => ({ plan: props.location.query.plan }),
  dispatch => bindActionCreators({ createSubscription }, dispatch),
)(SubscriptionsCheckout);
