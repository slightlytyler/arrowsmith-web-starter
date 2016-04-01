import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import remove from 'assets/icons/remove.svg';

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

  update = () => console.log('update');

  delete = () => this.props.deleteProject(this.props.id);

  render() {
    return (
      <div styleName={this.props.active ? 'item--active' : 'item'} onClick={this.props.viewProject}>
        <div>
          {this.props.name}
        </div>
        <div styleName="remove" onClick={this.delete}>
          <Icon path={remove} color="currentColor" width="1em" />
        </div>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { findRecord, updateProject, deleteProject } from 'pods/project/model';

const projectBasePath = id => `/projects/${id}`;
const viewProjectPath = id => `${projectBasePath(id)}/goals/active`;

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active:
      state.router.locationBeforeTransitions.pathname.indexOf(projectBasePath(props.id)) === 0
    ,
  }),
  (dispatch, props) => bindActionCreators({
    updateProject,
    deleteProject,
    viewProject: push.bind(undefined, viewProjectPath(props.id)),
  }, dispatch),
)(ProjectItem);
