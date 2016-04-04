import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectsViewer from 'pods/projects/components/Viewer';
import ProjectsEmpty from 'pods/projects/components/Empty';

@cssModules(styles)
export class Editor extends Component {
  static propTypes = {
    hasProjects: PropTypes.bool.isRequired,
    children: PropTypes.element,
  };

  render() {
    if (this.props.hasProjects) {
      return (
        <div styleName="editor">
          <ProjectsViewer />
          {this.props.children}
        </div>
      );
    }

    return (
      <div styleName="editor">
        <ProjectsViewer />
        <ProjectsEmpty />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { recordsSelector } from 'pods/projects/selectors';

export default connect(
  state => ({ hasProjects: recordsSelector(state).length > 0 })
)(Editor);
