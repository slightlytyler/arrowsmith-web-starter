import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { Root as SubscriptionsRoot } from 'modules/subscriptions';
import CardsViewer from 'modules/cards/components/Viewer';

function UserDashboardBilling() {
  return (
    <div styleName="content">
      <section styleName="section">
        <header styleName="header">Subscription</header>
        <SubscriptionsRoot />
      </section>
      <section styleName="section">
        <header styleName="header">Cards</header>
        <CardsViewer />
      </section>
    </div>
  );
}

export default cssModules(UserDashboardBilling, styles);
