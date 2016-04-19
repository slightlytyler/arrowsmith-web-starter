import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Icon from 'react-svgcon';

import styles from './styles.styl';
import plus from 'assets/icons/plus.svg';
import Input from './Input';

@cssModules(styles)
export class GoalsCreator extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      create: PropTypes.func.isRequired,
    }),
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

  handleCreate = text => {
    if (text) {
      this.props.actions.create({ text });
    }

    this.setState({ active: false });
  }

  renderPlaceholder() {
    return (
      <div styleName="content">
        <section styleName="add--icon">
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
        <div styleName="creator--editing">
          <Input placeholder={this.placeholder} handleSubmit={this.handleCreate} />
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
import { create } from 'modules/goals/actions';
import { createStructuredActions } from 'utils';

export default connect(
  undefined,
  createStructuredActions({ create }, 'projectId')
)(GoalsCreator);
