import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectCreator from 'pods/project/components/Creator';
import ProjectList from 'pods/project/components/List';

@cssModules(styles)
export class ProjectsViewer extends Component {
  static propTypes = {
    subscribeProjects: PropTypes.func.isRequired,
    unsubscribeProjects: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.subscribeProjects();
  }

  componentWillUnmount() {
    this.props.unsubscribeProjects();
  }

  render() {
    return (
      <div styleName="viewer">
        <ProjectCreator />
        <ProjectList />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createProjectsSubscription } from 'pods/project/model';

export default connect(
  undefined,
  dispatch => dispatch(createProjectsSubscription()),
)(ProjectsViewer);
