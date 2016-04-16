import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import Hero from '../Hero';
import Propositions from '../Propositions';
import Trial from '../Trial';

export function LandingLayout() {
  return (
    <div styleName="layout">
      <Hero />
      <Propositions />
      <Trial />
    </div>
  );
}

export default cssModules(LandingLayout, styles);
