import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import TodoCreator from 'pods/todo/components/Creator'
import TodoList from 'pods/todo/components/List';

@cssModules(styles)
export default class IndexLayout extends Component {
  render() {
    return (
      <div styleName="page-container">
        <div styleName="todo-container">
          <div styleName="background">
            <TodoCreator />
            <TodoList
              todos={[
                {
                  id: 1,
                  text: 'Get this app complete.',
                  complete: false,
                },
                {
                  id: 2,
                  text: 'Build a prototype.',
                  complete: false,
                },
                {
                  id: 3,
                  text: 'Sell that shit.',
                  complete: false,
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}
