import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class ProjectsViewer extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div styleName="viewer">
        <ul styleName="project-list">
          <li styleName="project-item">Project 1</li>
          <li styleName="project-item--active">Project 2</li>
          <li styleName="project-item">Project 3</li>
          <li styleName="project-item">Project 4</li>
        </ul>

        {this.props.children}
      </div>
    );
  }
}

import { connect } from 'react-redux';

export default connect()(ProjectsViewer);
