import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectCreator from '../Creator';
import ProjectList from '../List';

@cssModules(styles)
export class ProjectsRoot extends Component {
  static propTypes = {
    fetchProjects: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div styleName="root">
        <ProjectCreator />
        <ProjectList />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProjects } from 'modules/projects/actions';

export default connect(
  undefined,
  dispatch => bindActionCreators({ fetchProjects }, dispatch),
)(ProjectsRoot);
