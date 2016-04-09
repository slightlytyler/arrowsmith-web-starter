import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export default class SubscriptionOptions extends Component {
  render() {
    return (
      <div styleName="options">
        <section styleName="option">
          <header styleName="header">Standard</header>
          <div styleName="content">
            <section styleName="price">$5/mo</section>
            <section styleName="tag-line">
              All-in-one customer support for small business
            </section>
            <button styleName="button">Get started</button>
          </div>
        </section>
        <section styleName="option">
          <header styleName="header--highlight">Pro</header>
          <div styleName="content">
            <section styleName="price">$10/mo</section>
            <section styleName="tag-line">
              Everything you need to take support to the next level
            </section>
            <button styleName="button--highlight">Get started</button>
          </div>
        </section>
        <section styleName="option">
          <header styleName="header">Enterprise</header>
          <div styleName="content">
            <section styleName="price">$20/mo</section>
            <section styleName="tag-line">
              Complete support with enterprise-grade customization
            </section>
            <button styleName="button">Get started</button>
          </div>
        </section>
      </div>
    );
  }
}
