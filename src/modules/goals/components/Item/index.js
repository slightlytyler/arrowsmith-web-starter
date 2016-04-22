import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import checkIcon from 'assets/icons/check.svg';
import destroyIcon from 'assets/icons/destroy.svg';
import Input from './Input';

@cssModules(styles)
export class GoalsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      update: PropTypes.func.isRequired,
      destroy: PropTypes.func.isRequired,
      toggle: PropTypes.func.isRequired,
    }),
  };

  state = {
    editing: false,
  };

  edit = () => this.setState({ editing: true });

  save = text => {
    if (text) {
      this.props.actions.update({ text });
      this.setState({ editing: false });
    } else {
      this.props.actions.destroy();
    }
  }

  destroy = () => this.props.actions.destroy();

  toggle = () => this.props.actions.toggle();

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
              <Icon path={checkIcon} color="white" width="100%" />
            </span>
          </label>
        </div>
        <div>
          {this.props.text}
        </div>
        <div styleName="destroy" onClick={this.destroy}>
          <Icon path={destroyIcon} color="currentColor" width="1em" />
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
            actions={{ save: this.save }}
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
import { createStructuredActions } from 'utils';
import { findRecord } from 'modules/goals/selectors';
import { update, destroy, toggle } from 'modules/goals/actions';

export default connect(
  findRecord,
  createStructuredActions({ update, destroy, toggle }, 'id')
)(GoalsItem);
