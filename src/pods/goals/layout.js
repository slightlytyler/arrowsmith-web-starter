import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';
import GoalCreator from 'pods/goal/components/Creator';
import GoalList from 'pods/goal/components/List';
import GoalFilters from 'pods/goal/components/Filters';

@cssModules(styles)
export class GoalsLayout extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_FILTER,
      COMPLETE_FILTER,
      ALL_FILTER,
    ]).isRequired,
    registerGoalListeners: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.registerGoalListeners();
  }

  render() {
    const { activeFilter } = this.props;

    return (
      <div styleName="page-container">
        <div styleName="goal-container">
          <div styleName="background">
            <GoalCreator />
            <GoalList activeFilter={activeFilter} />
            <GoalFilters activeFilter={activeFilter} />
          </div>
        </div>
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
  (sProps, dProps) => Object.assign({}, sProps, dProps),
)(GoalsLayout);