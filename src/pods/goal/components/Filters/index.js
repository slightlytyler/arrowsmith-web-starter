import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';

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
              styleName={classNames('item', { active: activeFilter === ACTIVE_FILTER })}
            >
              Active
            </Link>
            <Link
              to={route('complete')}
              styleName={classNames('item', { active: activeFilter === COMPLETE_FILTER })}
            >
              Complete
            </Link>
            <Link
              to={route('all')}
              styleName={classNames('item', { active: activeFilter === ALL_FILTER })}
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
import { remainingGoalsSelector } from 'pods/goal/model';

export default connect(
  (state, props) => ({
    remainingGoalsCount: remainingGoalsSelector(state, props.projectId).length,
  }),
)(GoalFilters);
