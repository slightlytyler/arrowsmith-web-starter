import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import check from 'assets/icons/check.svg';
import remove from 'assets/icons/remove.svg';

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

  delete = () => this.props.deleteTodo(this.props.id);

  toggle = () => this.props.toggleTodo(this.props.id);

  render() {
    return (
      <div styleName="item">
        <div styleName="content">
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
