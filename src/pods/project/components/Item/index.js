import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class ProjectItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    viewProject: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div styleName={this.props.active ? 'item--active' : 'item'} onClick={this.props.viewProject}>
        {this.props.name}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { findRecord } from 'pods/project/model';

const projectBasePath = id => `/projects/${id}`;
const viewProjectPath = id => `${projectBasePath(id)}/goals/active`;

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
    active:
      state.router.locationBeforeTransitions.pathname.indexOf(projectBasePath(props.id)) === 0
    ,
  }),
  (dispatch, props) => ({
    viewProject: () => dispatch(push(viewProjectPath(props.id))),
  }),
)(ProjectItem);
