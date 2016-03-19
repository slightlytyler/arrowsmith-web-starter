import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import check from 'assets/icons/check.svg';

@cssModules(styles)
export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

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
              value={this.props.complete}
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
          {this.props.text}
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecord, toggleTodo } from 'pods/todo/model';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
  }),
  dispatch => bindActionCreators({ toggleTodo }, dispatch),
)(TodoItem);
