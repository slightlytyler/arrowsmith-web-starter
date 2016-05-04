import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';
import { filters } from 'modules/goals/constants';

@cssModules(styles, { allowMultiple: true })
export class GoalsFilters extends Component {
  static propTypes = {
    remainingGoalsCount: PropTypes.number.isRequired,
    projectId: PropTypes.string.isRequired,
    activeFilter: PropTypes.string.isRequired,
  };

  render() {
    const { remainingGoalsCount, projectId, activeFilter } = this.props;
    const route = filter => `/projects/${projectId}/goals/${filter}`;

    return (
      <div styleName="filters">
        <div styleName="container">
          <section
            styleName={classNames('remaining-count', {
              complete: remainingGoalsCount === 0,
            })}
          >
            {remainingGoalsCount} goals left
          </section>
          <section styleName="list">
            <Link
              to={route('active')}
              styleName={classNames('item', {
                active: activeFilter === filters.REMAINING_FILTER,
              })}
            >
              Active
            </Link>
            <Link
              to={route('complete')}
              styleName={classNames('item', {
                active: activeFilter === filters.COMPLETED_FILTER,
              })}
            >
              Complete
            </Link>
            <Link
              to={route('all')}
              styleName={classNames('item', {
                active: activeFilter === filters.ALL_FILTER,
              })}
            >
              All
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  recordsByIdSelector,
  allRecordIdsSelector,
  recordIdsByProjectIdDeriver,
  getRemainingCollectionIds,
} from 'modules/goals/selectors';

const projectIdSelector = (state, props) => props.projectId;
const remainingGoalsCountSelector = createSelector(
  recordsByIdSelector,
  allRecordIdsSelector,
  projectIdSelector,
  (recordsById, recordIds, projectId) => getRemainingCollectionIds(
    recordsById,
    recordIdsByProjectIdDeriver(recordIds, recordsById, projectId)
  ).length
);

export default connect(
  createStructuredSelector({ remainingGoalsCount: remainingGoalsCountSelector })
)(GoalsFilters);
