import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class CardsRoot extends Component {
  static propTypes = {
    card: PropTypes.string,
    actions: PropTypes.shape({
      getRecord: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.props.actions.getRecord();
  }

  render() {
    if (this.props.card) {
      return (
        <div>{this.props.card}</div>
      );
    }
    return (
      <div>Cards Root</div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'utils';
import { recordIdsSelector } from 'modules/cards/selectors';
import { get as getRecord } from 'modules/cards/actions';

export default connect(
  state => ({
    card: recordIdsSelector(state)[0],
  }),
  createStructuredActions({ getRecord })
)(CardsRoot);
