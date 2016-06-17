import React, { Component, PropTypes } from 'react';
import { Label, MultiSelect } from 'react-portland-ui';

export class ProvidersFilter extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.array,
    groupIds: PropTypes.array,
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
      if (this.props.groupIds.length) {
        this.props.actions.fetchCollection({
          groupIds: this.props.groupIds,
        });
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.groupIds.length && this.props.groupIds !== nextProps.groupIds) {
      this.props.actions.fetchCollection({ groupIds: nextProps.groupIds });
    }
  }

  handleChange = ids => this.props.actions.selectItems(ids);

  render() {
    return (
      <div className={this.props.className}>
        <Label className="label">Providers</Label>
        <MultiSelect
          name="groups"
          value={this.props.value}
          options={this.props.options}
          onChange={this.handleChange}
          placeholder="Select providers"
          loading={this.props.loading}
          disabled={!this.props.groupIds.length}
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
} from 'modules/providers/selectors';
import { fetchCollection, selectItems } from 'modules/providers/actions';
import { selectors as groupsSelectors } from 'modules/groups';

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
    groupIds: groupsSelectors.getSelectedItems,
    loading: state => isLoading(state),
  }),
  createStructuredActions({
    fetchCollection,
    selectItems,
  })
)(ProvidersFilter);
