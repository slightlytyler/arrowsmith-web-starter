import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import {
  ACTIVE_GOALS_FILTER,
  COMPLETE_GOALS_FILTER,
  ALL_GOALS_FILTER,
} from 'modules/goals/constants';
import GoalCreator from '../Creator';
import GoalList from '../List';
import GoalFilters from '../Filters';

@cssModules(styles)
export class GoalsRoot extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_GOALS_FILTER,
      COMPLETE_GOALS_FILTER,
      ALL_GOALS_FILTER,
    ]).isRequired,
    projectId: PropTypes.string.isRequired,
    fetchGoals: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchGoals(this.props.projectId);
  }

  render() {
    const { activeFilter, projectId } = this.props;

    return (
      <div styleName="root">
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
import { bindActionCreators } from 'redux';
import { activeFilterSelector } from 'modules/goals/selectors';
import { fetchGoals } from 'modules/goals/actions';

export default connect(
  (state, props) => ({
    activeFilter: activeFilterSelector(props),
    projectId: props.params.projectId,
  }),
  dispatch => bindActionCreators({ fetchGoals }, dispatch),
)(GoalsRoot);
