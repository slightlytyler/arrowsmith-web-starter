import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  };

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
            />
            <label
              styleName="label"
              htmlFor={`${this.props.id}-checkbox`}
            />
          </div>
          {this.props.text}
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { findRecord } from 'pods/todo/model';

export default connect((state, props) => ({
  ...findRecord(state, props.id),
}))(TodoItem);
