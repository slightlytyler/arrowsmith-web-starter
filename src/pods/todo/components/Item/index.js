import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export default class TodoItem extends Component {
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
