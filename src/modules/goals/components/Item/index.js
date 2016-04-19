import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import check from 'assets/icons/check.svg';
import remove from 'assets/icons/remove.svg';
import Input from './Input';

@cssModules(styles)
export class GoalsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    updateGoal: PropTypes.func.isRequired,
    deleteGoal: PropTypes.func.isRequired,
    toggleGoal: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  handleEdit = () => this.setState({ editing: true });

  handleSave = text => {
    if (text) {
      this.props.updateGoal({ text });
      this.setState({ editing: false });
    } else {
      this.props.deleteGoal();
    }
  }

  handleDelete = () => this.props.deleteGoal();

  handleToggle = () => this.props.toggleGoal();

  renderContent() {
    return (
      <div styleName="content" onDoubleClick={this.handleEdit}>
        <div styleName="checkbox">
          <input
            styleName="input"
            type="checkbox"
            id={`${this.props.id}-checkbox`}
            checked={this.props.complete}
            onChange={this.handleToggle}
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
        <div styleName="remove" onClick={this.handleDelete}>
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
            handleSave={this.handleSave}
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
import { updateGoal, deleteGoal, toggleGoal } from 'modules/goals/actions';

export default connect(
  findRecord,
  createStructuredActions({ updateGoal, deleteGoal, toggleGoal }, 'id')
)(GoalsItem);
