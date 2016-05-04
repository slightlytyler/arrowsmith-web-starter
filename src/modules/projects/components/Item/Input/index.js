import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import keycode from 'keycode';
import Icon from 'react-svgcon';

import styles from '../styles.styl';
import editIcon from 'assets/icons/edit.svg';

@cssModules(styles)
export default class ProjectsItemInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }),
  };

  handleKeyDown = e => {
    if (keycode(e.which) === 'enter') {
      this.props.actions.update();
    }
  };

  handleBlur = () => this.props.actions.update();

  handleFocus = e => {
    const { target } = e;
    target.value = target.value;
  };

  render() {
    return (
      <div styleName="item--update">
        <input
          ref="input"
          styleName="input"
          defaultValue={this.props.name}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          autoFocus
        />
        <div styleName="edit">
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }
}
