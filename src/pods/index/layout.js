import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import TodoCreator from 'pods/todo/components/Creator';
import TodoList from 'pods/todo/components/List';
import TodoFilters from 'pods/todo/components/Filters';

@cssModules(styles)
export default class IndexLayout extends Component {
  render() {
    return (
      <div styleName="page-container">
        <div styleName="todo-container">
          <div styleName="background">
            <TodoCreator />
            <TodoList />
            <TodoFilters />
          </div>
        </div>
      </div>
    );
  }
}
