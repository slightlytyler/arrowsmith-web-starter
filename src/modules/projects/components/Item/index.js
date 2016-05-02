import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import keycode from 'keycode';
import Icon from 'react-svgcon';
import SweetAlert from 'sweetalert-react';

import styles from './styles.styl';
import editIcon from 'assets/icons/edit.svg';
import deleteIcon from 'assets/icons/delete.svg';

@cssModules(styles)
export class ProjectsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    remainingGoalsCount: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      updateRecord: PropTypes.func.isRequired,
      deleteRecord: PropTypes.func.isRequired,
      viewRecord: PropTypes.func.isRequired,
    }),
  };

  state = {
    editing: false,
    confirmingRemove: false,
    deleteConfirmed: false,
  };

  edit = () => this.setState({ editing: true });

  update = () => {
    this.props.actions.updateRecord(this.props.id, { name: this.refs.input.value });
    this.setState({ editing: false });
  };

  delete = () => {
    if (this.props.remainingGoalsCount && !this.state.deleteConfirmed) {
      this.showRemoveConfirmation();
    } else {
      this.props.actions.deleteRecord(this.props.id, this.props.active);
    }
  };

  showRemoveConfirmation = () => this.setState({ confirmingRemove: true });

  confirmRemove = () => {
    this.setState({ confirmingRemove: false, deleteConfirmed: true });
    this.delete();
  };

  cancelRemove = () => this.setState({ confirmingRemove: false });

  view = () => {
    if (!this.props.active) {
      this.props.actions.viewRecord(this.props.id);
    }
  };

  renderInput() {
    const handleKeyDown = e => {
      if (keycode(e.which) === 'enter') {
        this.update();
      }
    };
    const handleBlur = () => this.update();
    const handleFocus = e => {
      const { target } = e;
      target.value = target.value;
    };

    return (
      <div styleName="item--update">
        <input
          ref="input"
          styleName="input"
          defaultValue={this.props.name}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoFocus
        />
        <div styleName="edit">
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderInput();
    }

    return (
      <div styleName={this.props.active ? 'item--active' : 'item'}>
        <div styleName="name" onClick={this.view}>
          {this.props.name}
        </div>
        <div styleName="delete" onClick={this.delete}>
          <Icon path={deleteIcon} color="currentColor" width="1em" />
        </div>
        <div styleName="edit" onClick={this.edit}>
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
        <SweetAlert
          show={this.state.confirmingRemove}
          title="Confirm delete"
          text={`
            This project has ${this.props.remainingGoalsCount} unfinished \
            ${this.props.remainingGoalsCount === 1 ? 'goal' : 'goals'}.
            Are you sure you want to delete it?
          `}
          showCancelButton
          onConfirm={this.confirmRemove}
          onCancel={this.cancelRemove}
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createStructuredActions } from 'utils';
import { findRecord } from 'modules/projects/selectors';
import { updateRecord, deleteRecord, viewRecord } from 'modules/projects/actions';
import {
  recordIdsSelector as goalIdsSelector,
  recordsByIdSelector as goalsByIdSelector,
  recordIdsByProjectIdDeriver as goalIdsByProjectIdDeriver,
  remainingRecordIdsDeriver as remainingGoalIdsDeriver,
} from 'modules/goals/selectors';

const projectIdSelector = (state, props) => props.id;
const remainingGoalsCountSelector = createSelector(
  goalIdsSelector,
  goalsByIdSelector,
  projectIdSelector,
  (goalIds, goalsById, projectId) => remainingGoalIdsDeriver(
    goalIdsByProjectIdDeriver(goalIds, goalsById, projectId),
    goalsById
  ).length
);

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active: state.router.locationBeforeTransitions.pathname.indexOf(`/projects/${props.id}`) === 0,
    remainingGoalsCount: remainingGoalsCountSelector(state, props),
  }),
  createStructuredActions({
    updateRecord,
    deleteRecord,
    viewRecord,
  })
)(ProjectsItem);
