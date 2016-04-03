import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';

@cssModules(styles, { allowMultiple: true })
export class GoalFilters extends Component {
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
              styleName={classNames('item', { active: activeFilter === ACTIVE_GOALS_FILTER })}
            >
              Active
            </Link>
            <Link
              to={route('complete')}
              styleName={classNames('item', { active: activeFilter === COMPLETE_GOALS_FILTER })}
            >
              Complete
            </Link>
            <Link
              to={route('all')}
              styleName={classNames('item', { active: activeFilter === ALL_GOALS_FILTER })}
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
import { remainingGoalIdsSelector } from 'pods/goals/selectors';

export default connect(
  (state, props) => ({
    remainingGoalsCount: remainingGoalIdsSelector(state, props.projectId).length,
  }),
)(GoalFilters);
