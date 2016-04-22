import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import ProjectCreator from '../Creator';
import ProjectList from '../List';

@cssModules(styles)
export class ProjectsRoot extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchRecords: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    this.props.actions.fetchRecords();
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
import { createStructuredActions } from 'utils';
import { fetch as fetchRecords } from 'modules/projects/actions';

export default connect(
  undefined,
  createStructuredActions({ fetchRecords }),
)(ProjectsRoot);
