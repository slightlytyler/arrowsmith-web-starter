import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import TodoItem from '../Item';

@cssModules(styles)
export default class TodoList extends Component {
  render() {
    return (
      <div styleName="list">
        {this.props.todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
      </div>
    );
  }
}
