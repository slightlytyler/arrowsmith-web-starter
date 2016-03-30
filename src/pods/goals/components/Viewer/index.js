import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';
import GoalCreator from 'pods/goal/components/Creator';
import GoalList from 'pods/goal/components/List';
import GoalFilters from 'pods/goal/components/Filters';

@cssModules(styles)
export class GoalsViewer extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_FILTER,
      COMPLETE_FILTER,
      ALL_FILTER,
    ]).isRequired,
    projectId: PropTypes.string.isRequired,
    registerGoalListeners: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.registerGoalListeners();
  }

  render() {
    const { activeFilter, projectId } = this.props;

    return (
      <div styleName="viewer">
        <GoalCreator projectId={projectId} />
        <GoalFilters activeFilter={activeFilter} />
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
import { activeFilterSelector, registerGoalListeners } from 'pods/goal/model';

export default connect(
  (state, props) => ({ activeFilter: activeFilterSelector(props) }),
  dispatch => bindActionCreators({ registerGoalListeners }, dispatch),
  (sProps, dProps, oProps) => Object.assign({}, sProps, dProps, {
    projectId: oProps.params.projectId,
  }),
)(GoalsViewer);
