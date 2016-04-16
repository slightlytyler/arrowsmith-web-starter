import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cssModules from 'react-css-modules';
import listensToClickOutside from 'react-onclickoutside/decorator';
import styles from '../styles.styl';

@listensToClickOutside()
@cssModules(styles, { allowMultiple: true })
export default class GoalsCreatorInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    addGoal: PropTypes.func.isRequired,
  };

  handleClickOutside = () => {
    this.addGoal();
  }

  addGoal = () => {
    this.props.addGoal(findDOMNode(this.refs.input).value);
  }

  handleKeyDown = e => e.which === 13 && this.addGoal();

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
          onClick={this.addGoal}
        >
          Add
        </section>
      </div>
    );
  }
}
