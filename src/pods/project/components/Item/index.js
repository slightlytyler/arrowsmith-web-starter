import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';
import keycode from 'keycode';

import styles from './styles.styl';
import editIcon from 'assets/icons/edit.svg';
import removeIcon from 'assets/icons/remove.svg';

@cssModules(styles)
export class ProjectItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    viewProject: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  edit = () => this.setState({ editing: true });

  update = () => {
    this.props.updateProject(this.props.id, { name: this.refs.input.value });
    this.setState({ editing: false });
  };

  delete = () => this.props.deleteProject(this.props.id, this.props.active);

  view = () => {
    if (!this.props.active) {
      this.props.viewProject(this.props.id);
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
        <div styleName="remove" onClick={this.delete}>
          <Icon path={removeIcon} color="currentColor" width="1em" />
        </div>
        <div styleName="edit" onClick={this.edit}>
          <Icon path={editIcon} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findRecord, updateProject, deleteProject, viewProject } from 'pods/project/model';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active: state.router.locationBeforeTransitions.pathname.indexOf(`/projects/${props.id}`) === 0,
  }),
  dispatch => bindActionCreators({
    updateProject,
    deleteProject,
    viewProject,
  }, dispatch),
)(ProjectItem);
