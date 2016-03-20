import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';

@cssModules(styles, { allowMultiple: true })
export class TodoFilters extends Component {
  static propTypes = {
    remainingTodosCount: PropTypes.number.isRequired,
    activeFilter: PropTypes.string.isRequired,
  };

  render() {
    const { remainingTodosCount, activeFilter } = this.props;

    return (
      <div styleName="filters">
        <section
          styleName={classNames('remaining-count', {
            complete: remainingTodosCount === 0,
          })}
        >
          {remainingTodosCount} goals left
        </section>
        <section styleName="list">
          <Link
            to="/goals/active"
            styleName={classNames('item', { active: activeFilter === ACTIVE_FILTER })}
          >
            Active
          </Link>
          <Link
            to="/goals/complete"
            styleName={classNames('item', { active: activeFilter === COMPLETE_FILTER })}
          >
            Complete
          </Link>
          <Link
            to="/goals/all"
            styleName={classNames('item', { active: activeFilter === ALL_FILTER })}
          >
            All
          </Link>
        </section>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { remainingTodosSelector } from 'pods/goal/model';

export default connect(
  state => ({ remainingTodosCount: remainingTodosSelector(state).length }),
)(TodoFilters);
