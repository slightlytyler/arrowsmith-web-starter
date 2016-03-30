import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectsViewer from 'pods/projects/components/Viewer';

@cssModules(styles)
export class Editor extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div styleName="editor">
        <ProjectsViewer />
        {this.props.children}
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect()(Editor);
