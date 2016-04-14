import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import keycode from 'keycode';
import Icon from 'react-svgcon';
import SweetAlert from 'sweetalert-react';

import styles from './styles.styl';
import editIcon from 'assets/icons/edit.svg';
import removeIcon from 'assets/icons/remove.svg';

@cssModules(styles)
export class ProjectsItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    viewProject: PropTypes.func.isRequired,
    remainingGoalsLength: PropTypes.number.isRequired,
  };

  state = {
    editing: false,
    confirmingDelete: false,
  };

  handleEdit = () => this.setState({ editing: true });

  handleUpdate = () => {
    this.props.updateProject(this.props.id, { name: this.refs.input.value });
    this.setState({ editing: false });
  };

  handleDelete = () => {
    if (this.props.remainingGoalsLength) {
      this.showDeleteConfirmation();
    } else {
      this.delete();
    }
  };

  delete = () => this.props.deleteProject(this.props.id, this.props.active);

  showDeleteConfirmation = () => this.setState({ confirmingDelete: true });

  confirmDelete = () => {
    this.setState({ confirmingDelete: false });
    this.delete();
  };

  cancelDelete = () => this.setState({ confirmingDelete: false });

  handleView = () => {
    if (!this.props.active) {
      this.props.viewProject(this.props.id);
    }
  };

  renderInput() {
    const handleKeyDown = e => {
      if (keycode(e.which) === 'enter') {
        this.handleUpdate();
      }
    };
    const handleBlur = () => this.handleUpdate();
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
        <div styleName="name" onClick={this.handleView}>
          {this.props.name}
        </div>
        <div styleName="remove" onClick={this.handleDelete}>
          <Icon path={removeIcon} color="currentColor" width="1em" />
        </div>
        <div styleName="edit" onClick={this.handleEdit}>
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
        <SweetAlert
          show={this.state.confirmingDelete}
          title="Confirm delete"
          text={`
            This project has ${this.props.remainingGoalsLength} unfinished \
            ${this.props.remainingGoalsLength === 1 ? 'goal' : 'goals'}.
            Are you sure you want to delete it?
          `}
          showCancelButton
          onConfirm={this.confirmDelete}
          onCancel={this.cancelDelete}
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecord } from 'pods/projects/selectors';
import { updateProject, deleteProject, viewProject } from 'pods/projects/actions';
import { remainingGoalIdsSelector } from 'pods/goals/selectors';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active: state.router.locationBeforeTransitions.pathname.indexOf(`/projects/${props.id}`) === 0,
    remainingGoalsLength: remainingGoalIdsSelector(state, props.id).length,
  }),
  dispatch => bindActionCreators({
    updateProject,
    deleteProject,
    viewProject,
  }, dispatch),
)(ProjectsItem);
