import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import plus from 'assets/icons/plus.svg';
import Input from './Input';

@cssModules(styles, { allowMultiple: true })
export class GoalCreator extends Component {
  static propTypes = {
    createGoal: PropTypes.func.isRequired,
  };

  state = {
    active: false,
  };

  placeholder = 'Add new goal';

  activate = () => {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }

  addGoal = text => {
    if (text) {
      this.props.createGoal(text);
    }

    this.setState({ active: false });
  }

  renderPlaceholder() {
    return (
      <div styleName="content">
        <section styleName="add">
          <Icon path={plus} color="#1EB5F9" width="1em" />
        </section>
        <section styleName="prompt">
          {this.placeholder}
        </section>
      </div>
    );
  }

  render() {
    if (this.state.active) {
      return (
        <div styleName="creator editing">
          <Input placeholder={this.placeholder} addGoal={this.addGoal} />
        </div>
      );
    }

    return (
      <div styleName="creator" onClick={this.activate}>
        {this.renderPlaceholder()}
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createGoal } from 'pods/goals/actions';

export default connect(
  undefined,
  (dispatch, props) => ({
    createGoal: text => dispatch(createGoal(text, props.projectId)),
  }),
)(GoalCreator);
