import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import TodoItem from '../Item';

@cssModules(styles)
export class TodoList extends Component {
  static propTypes = {
    goals: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.goals.map(id => <TodoItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { filteredRecordsSelector } from 'pods/goal/model';

export default connect(
  (state, props) => ({ goals: filteredRecordsSelector(state, props.activeFilter) }),
)(TodoList);
