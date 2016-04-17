import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class CardsRoot extends Component {
  static propTypes = {
    card: PropTypes.string,
    fetchCard: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchCard();
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
import { bindActionCreators } from 'redux';
import { recordIdsSelector } from 'modules/cards/selectors';
import { fetchCard } from 'modules/cards/actions';

export default connect(
  state => ({
    card: recordIdsSelector(state)[0],
  }),
  dispatch => bindActionCreators({ fetchCard }, dispatch)
)(CardsRoot);
