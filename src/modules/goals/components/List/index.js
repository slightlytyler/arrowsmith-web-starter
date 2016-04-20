import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import GoalItem from '../Item';

@cssModules(styles)
export class GoalsList extends Component {
  static propTypes = {
    goals: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.goals.map(id => <GoalItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  recordIdsSelector,
  recordsByIdSelector,
  recordIdsByProjectIdDeriver,
  filteredRecordIdsDeriver,
} from 'modules/goals/selectors';

const projectIdSelector = (state, props) => props.projectId;
const activeFilterSelector = (state, props) => props.activeFilter;
const goalsSelector = createSelector(
  recordIdsSelector,
  recordsByIdSelector,
  projectIdSelector,
  activeFilterSelector,
  (recordIds, recordsById, projectId, activeFilter) => filteredRecordIdsDeriver(
    recordIdsByProjectIdDeriver(recordIds, recordsById, projectId),
    recordsById,
    activeFilter
  )
);

export default connect(
  createStructuredSelector({ goals: goalsSelector })
)(GoalsList);
