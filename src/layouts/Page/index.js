import React from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import Header from 'components/Header';

function Page({ children }) {
  return (
    <div styleName="page">
      <Header />
      {children}
    </div>
  );
}

export default cssModules(Page, styles);
