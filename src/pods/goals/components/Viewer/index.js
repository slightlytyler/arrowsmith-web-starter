import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';
import GoalCreator from 'pods/goal/components/Creator';
import GoalList from 'pods/goal/components/List';
import GoalFilters from 'pods/goal/components/Filters';

@cssModules(styles)
export class GoalsViewer extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_GOALS_FILTER,
      COMPLETE_GOALS_FILTER,
      ALL_GOALS_FILTER,
    ]).isRequired,
    projectId: PropTypes.string.isRequired,
    subscribeGoals: PropTypes.func.isRequired,
    unsubscribeGoals: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.subscribeGoals();
  }

  componentWillUpdate(nextProps) {
    if (this.props.subscribeGoals !== nextProps.subscribeGoals) {
      this.props.unsubscribeGoals();
      nextProps.subscribeGoals();
    }
  }

  componentWillUnmount() {
    this.props.unsubscribeGoals();
  }

  render() {
    const { activeFilter, projectId } = this.props;

    return (
      <div styleName="viewer">
        <GoalCreator projectId={projectId} />
        <GoalFilters projectId={projectId} activeFilter={activeFilter} />
        <GoalList
          projectId={projectId}
          activeFilter={activeFilter}
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { activeFilterSelector } from 'pods/goals/selectors';
import { createGoalsSubscription } from 'pods/goals/actions';

export default connect(
  (state, props) => ({
    activeFilter: activeFilterSelector(props),
    projectId: props.params.projectId,
  }),
  (dispatch, props) => dispatch(createGoalsSubscription(props.params.projectId)),
)(GoalsViewer);
