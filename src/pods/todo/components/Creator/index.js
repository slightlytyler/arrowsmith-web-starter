import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import plus from 'assets/icons/plus.svg';

@cssModules(styles, { allowMultiple: true })
export default class TodoCreator extends Component {
  renderPlaceholder() {
    return (
      <div styleName="content">
        <section styleName="add">
          <Icon path={plus} color="#1EB5F9" width="1.25em" />
        </section>
        <section styleName="prompt">
          Add new goal
        </section>
        <hr styleName="rule" />
      </div>
    );
  }

  renderInput() {
    return (
      <div styleName="content">
        <input styleName="input" value="A new todo" autofocus />
        <section styleName="add button">Add</section>
      </div>
    );
  }

  render() {
    return (
      <div styleName="creator">
        {this.renderPlaceholder()}
      </div>
    );
  }
}
