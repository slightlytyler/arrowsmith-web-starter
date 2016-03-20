import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cssModules from 'react-css-modules';
import listensToClickOutside from 'react-onclickoutside/decorator';
import styles from '../styles.styl';

@listensToClickOutside()
@cssModules(styles, { allowMultiple: true })
export default class TodoCreatorInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    addTodo: PropTypes.func.isRequired,
  };

  handleClickOutside = () => {
    this.addTodo();
  }

  addTodo = () => {
    this.props.addTodo(findDOMNode(this.refs.input).value);
  }

  handleKeyDown = e => e.which === 13 && this.addTodo();

  render() {
    return (
      <div styleName="content">
        <input
          ref="input"
          styleName="input"
          placeholder={this.props.placeholder}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
        <section
          styleName="add button"
          onClick={this.addTodo}
        >
          Add
        </section>
      </div>
    );
  }
}
