import React, { Component, PropTypes } from 'react';
import { Label, MultiSelect } from 'react-portland-ui';

export class GroupsFilter extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
    })),
    loading: PropTypes.bool,
    actions: PropTypes.shape({
      fetchCollection: PropTypes.func.isRequired,
      selectItems: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    loading: false,
  };

  componentWillMount() {
    if (!this.props.options || !this.props.options.length) {
      this.props.actions.fetchCollection();
    }
  }

  handleChange = ids => this.props.actions.selectItems(ids);

  render() {
    return (
      <div className={this.props.className}>
        <Label className="label">Groups</Label>
        <MultiSelect
          name="providers"
          value={this.props.value}
          options={this.props.options}
          onChange={this.handleChange}
          placeholder="Select groups"
          loading={this.props.loading}
        />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import {
  findCurrentCollection,
  findRecords,
  isLoading,
  getSelectedItems,
} from 'modules/groups/selectors';
import { fetchCollection, selectItems } from 'modules/groups/actions';

const optionsSelector = state => {
  const collection = findCurrentCollection(state);

  if (collection) {
    const records = findRecords(state, collection.ids);

    return records.map(record => ({
      value: record.id,
      label: record.name,
    }));
  }

  return undefined;
};

export default connect(
  createStructuredSelector({
    value: state => getSelectedItems(state),
    options: optionsSelector,
    loading: state => isLoading(state),
  }),
  createStructuredActions({
    fetchCollection,
    selectItems,
  })
)(GroupsFilter);
