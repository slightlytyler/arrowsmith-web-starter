import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './styles.styl';

@cssModules(styles, { allowMultiple: true })
export class TodoFilters extends Component {
  static propTypes = {
    remainingTodos: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div styleName="filters">
        <section
          styleName={classNames('remaining-count', {
            complete: this.props.remainingTodos === 0,
          })}
        >
          {this.props.remainingTodos} goals left
        </section>
        <section styleName="list">
          <div styleName="item">Active</div>
          <div styleName="item">Complete</div>
          <div styleName="item">All</div>
        </section>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { remainingTodos } from 'pods/todo/model';

export default connect(
  state => ({ remainingTodos: remainingTodos(state).length }),
)(TodoFilters);
