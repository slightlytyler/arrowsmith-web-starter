import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectItem from '../Item';

@cssModules(styles)
export class ProjectList extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.projects.map(id => <ProjectItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { recordsSelector } from 'pods/project/model';

export default connect(
  state => ({ projects: recordsSelector(state) }),
)(ProjectList);