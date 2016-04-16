import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';
import GoalItem from '../Item';

@cssModules(styles)
export class GoalsList extends Component {
  static propTypes = {
    goals: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div styleName="list">
        {this.props.goals.map(id => <GoalItem key={id} id={id} />)}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { filteredProjectGoalsSelector } from 'modules/goals/selectors';

export default connect(
  (state, props) => ({
    goals: filteredProjectGoalsSelector(state, props.projectId, props.activeFilter),
  }),
)(GoalsList);
