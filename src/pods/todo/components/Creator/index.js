import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import plus from 'assets/icons/plus.svg';
import Input from './Input';

@cssModules(styles, { allowMultiple: true })
export class TodoCreator extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
  };

  state = {
    active: false,
  };

  placeholder = 'Add new goal';

  activate = () => {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }

  addTodo = text => {
    if (text) {
      this.props.createTodo(text);
    }

    this.setState({ active: false });
  }

  renderPlaceholder() {
    return (
      <div styleName="content">
        <section styleName="add">
          <Icon path={plus} color="#1EB5F9" width="1.25em" />
        </section>
        <section styleName="prompt">
          {this.placeholder}
        </section>
        <hr styleName="rule" />
      </div>
    );
  }

  render() {
    if (this.state.active) {
      return (
        <div styleName="creator editing">
          <Input placeholder={this.placeholder} addTodo={this.addTodo} />
        </div>
      );
    }

    return (
      <div styleName="creator" onClick={this.activate}>
        {this.renderPlaceholder()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTodo } from 'pods/todo/model';

export default connect(
  undefined,
  dispatch => bindActionCreators({ createTodo }, dispatch),
)(TodoCreator);
