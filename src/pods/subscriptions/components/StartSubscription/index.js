import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class StartSubscription extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        Start your subscription
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect(
  state => ({ user: state.user.id }),
)(StartSubscription);
