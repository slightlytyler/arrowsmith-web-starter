import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export class ProjectItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div styleName="item">
        {this.props.name}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { findRecord } from 'pods/project/model';

export default connect(
  (state, props) => ({
    ...findRecord(state, props.id),
  }),
)(ProjectItem);
