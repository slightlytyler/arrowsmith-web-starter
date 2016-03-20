import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';
import TodoCreator from 'pods/goal/components/Creator';
import TodoList from 'pods/goal/components/List';
import TodoFilters from 'pods/goal/components/Filters';

@cssModules(styles)
export class GoalsLayout extends Component {
  static propTypes = {
    activeFilter: PropTypes.oneOf([
      ACTIVE_FILTER,
      COMPLETE_FILTER,
      ALL_FILTER,
    ]).isRequired,
  };

  render() {
    const { activeFilter } = this.props;

    return (
      <div styleName="page-container">
        <div styleName="goal-container">
          <div styleName="background">
            <TodoCreator />
            <TodoList activeFilter={activeFilter} />
            <TodoFilters activeFilter={activeFilter} />
          </div>
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { activeFilterSelector } from 'pods/goal/model';

export default connect(
  (state, props) => ({ activeFilter: activeFilterSelector(props) }),
  undefined,
  sProps => sProps,
)(GoalsLayout);
