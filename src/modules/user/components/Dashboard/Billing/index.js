import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import SubscriptionViewer from 'modules/subscription/components/Viewer';
import CardsViewer from 'modules/cards/components/Viewer';

function UserDashboardBilling() {
  return (
    <div styleName="content">
      <section styleName="section">
        <header styleName="header">Subscription</header>
        <SubscriptionViewer />
      </section>
      <section styleName="section">
        <header styleName="header">Cards</header>
        <CardsViewer />
      </section>
    </div>
  );
}

export default cssModules(UserDashboardBilling, styles);