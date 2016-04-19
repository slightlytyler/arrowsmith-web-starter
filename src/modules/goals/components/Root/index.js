import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { filters } from 'modules/goals/constants';
import GoalCreator from '../Creator';
import GoalList from '../List';
import GoalFilters from '../Filters';

@cssModules(styles)
export class GoalsRoot extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf(Object.values(filters)).isRequired,
    projectId: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      fetchRecords: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.props.actions.fetchRecords(this.props.projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectId !== nextProps.projectId) {
      this.props.actions.fetchRecords(nextProps.projectId);
    }
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
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'utils';
import { fetchMany as fetchRecords } from 'modules/goals/actions';

const activeFilterSelector = (state, props) => props.route.filter;
const projectIdSelector = (state, props) => props.params.projectId;

export default connect(
  createStructuredSelector({
    activeFilter: activeFilterSelector,
    projectId: projectIdSelector,
  }),
  createStructuredActions({ fetchRecords })
)(GoalsRoot);
