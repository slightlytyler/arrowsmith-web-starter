import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectItem from '../Item';

@cssModules(styles)
export class ProjectsList extends Component {
  static propTypes = {
    projectIds: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.projectIds.map(id => <ProjectItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { recordIdsSelector } from 'modules/projects/selectors';

export default connect(
  createStructuredSelector({ projectIds: recordIdsSelector })
)(ProjectsList);
