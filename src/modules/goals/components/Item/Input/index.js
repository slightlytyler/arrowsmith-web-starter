import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cssModules from 'react-css-modules';
import listensToClickOutside from 'react-onclickoutside/decorator';
import styles from './styles.styl';

@listensToClickOutside()
@cssModules(styles)
export default class GoalsInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    saveLabel: PropTypes.string,
    handleSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    saveLabel: 'Save',
  };

  handleClickOutside = () => this.handleSave();

  handleFocus = e => {
    const { target } = e;
    target.value = target.value;
  }

  handleSave = () => this.props.handleSave(findDOMNode(this.refs.input).value);

  handleKeyDown = e => e.which === 13 && this.handleSave();

  render() {
    return (
      <div styleName="content">
        <input
          ref="input"
          styleName="input"
          defaultValue={this.props.value}
          placeholder={this.props.placeholder}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          autoFocus
        />
        <section
          styleName="save-button"
          onClick={this.handleSave}
        >
          {this.props.saveLabel}
        </section>
      </div>
    );
  }
}
