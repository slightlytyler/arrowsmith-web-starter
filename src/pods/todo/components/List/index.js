import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import TodoItem from '../Item';

@cssModules(styles)
export class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.todos.map(id => <TodoItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { recordsSelector } from 'pods/todo/model';

export default connect(state => ({ todos: recordsSelector(state) }))(TodoList);
