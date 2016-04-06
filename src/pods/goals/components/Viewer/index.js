import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';
import GoalCreator from 'pods/goal/components/Creator';
import GoalList from 'pods/goal/components/List';
import GoalFilters from 'pods/goal/components/Filters';
import Pagination from 'components/Pagination';

@cssModules(styles)
export class GoalsViewer extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_GOALS_FILTER,
      COMPLETE_GOALS_FILTER,
      ALL_GOALS_FILTER,
    ]).isRequired,
    projectId: PropTypes.string.isRequired,
    query: PropTypes.shape({
      page: PropTypes.string.isRequired,
      perPage: PropTypes.string.isRequired,
    }),
  };

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
        <Pagination
          {...this.props.query}
          totalPages="1"
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { activeFilterSelector } from 'pods/goals/selectors';

export default connect(
  (state, props) => ({
    activeFilter: activeFilterSelector(props),
    projectId: props.params.projectId,
    query: props.location.query,
  }),
)(GoalsViewer);
