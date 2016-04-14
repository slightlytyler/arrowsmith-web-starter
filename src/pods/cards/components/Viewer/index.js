import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class CardsViewer extends Component {
  static propTypes = {
    card: PropTypes.array,
    fetchCard: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchCard();
  }

  render() {
    return (
      <div>Cards Viewer</div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recordIdsSelector } from 'pods/cards/selectors';
import { fetchCard } from 'pods/cards/actions';

export default connect(
  state => ({
    card: recordIdsSelector(state)[0],
  }),
  dispatch => bindActionCreators({ fetchCard }, dispatch)
)(CardsViewer);
