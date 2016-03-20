import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import check from 'assets/icons/check.svg';
import remove from 'assets/icons/remove.svg';
import Input from './Input';

@cssModules(styles)
export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  edit = () => this.setState({ editing: true });

  save = text => {
    if (text) {
      this.props.updateTodo(this.props.id, { text });
      this.setState({ editing: false });
    } else {
      this.props.deleteTodo(this.props.id);
    }
  }

  delete = () => this.props.deleteTodo(this.props.id);

  toggle = () => this.props.toggleTodo(this.props.id);

  renderContent() {
    return (
      <div styleName="content" onDoubleClick={this.edit}>
        <div styleName="checkbox">
          <input
            styleName="input"
            type="checkbox"
            id={`${this.props.id}-checkbox`}
            checked={this.props.complete}
            onChange={this.toggle}
          />
          <label
            styleName="label"
            htmlFor={`${this.props.id}-checkbox`}
          >
            <span styleName="check">
              <Icon path={check} color="white" width="100%" />
            </span>
          </label>
        </div>
        <div>
          {this.props.text}
        </div>
        <div styleName="remove" onClick={this.delete}>
          <Icon path={remove} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return (
        <div styleName="item">
          <Input
            value={this.props.text}
            handleSave={this.save}
          />
        </div>
      );
    }

    return (
      <div styleName="item">
        {this.renderContent()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecord, updateTodo, deleteTodo, toggleTodo } from 'pods/goal/model';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
  }),
  dispatch => bindActionCreators({ updateTodo, deleteTodo, toggleTodo }, dispatch),
)(TodoItem);
