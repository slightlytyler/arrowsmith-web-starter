import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectCreator from 'pods/project/components/Creator';
import ProjectList from 'pods/project/components/List';

@cssModules(styles)
export class ProjectsViewer extends Component {
  static propTypes = {
  };

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

export default connect(
  undefined,
)(ProjectsViewer);
