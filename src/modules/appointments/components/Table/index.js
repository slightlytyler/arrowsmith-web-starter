import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { startCase } from 'lodash';
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableHeadCell,
  TablePrompt,
  Spinner,
} from 'react-portland-ui';
import Row from './Row';
import { TABLE_COLUMNS } from 'modules/appointments/constants';

export class AppointmentsTable extends Component {
  static propTypes = {
    recordIds: PropTypes.array,
    sortBy: PropTypes.string,
    sortAscending: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      updateSort: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    loading: false,
  };

  renderLoadingState = () => (
    <TablePrompt className="loading-state" colSpan={TABLE_COLUMNS.length}>
      <Spinner className="spinner" thin />
    </TablePrompt>
  );

  renderEmptyState = () => (
    <TablePrompt className="empty-state" colSpan={TABLE_COLUMNS.length}>
      <span>No appointments.</span>
    </TablePrompt>
  );

  renderColumnHeaders = () => TABLE_COLUMNS.map(column => {
    const key = column.value;
    const classes = classnames(column.width, { wide: column.width });
    const label = typeof column.label === 'string' ? column.label : startCase(column.value);

    if (column.sort) {
      const sortBy = typeof column.sort === 'boolean' ? column.value : column.sort;
      const isCurrentSortBy = this.props.sortBy === sortBy;

      return (
        <TableHeadCell
          key={key}
          className={classes}
          active={isCurrentSortBy}
          sortBy={sortBy}
          sortAscending={isCurrentSortBy && this.props.sortAscending}
          onSort={this.props.actions.updateSort}
        >
          {label}
        </TableHeadCell>
      );
    }

    return (
      <TableHeadCell key={key} className={classes}>
        {label}
      </TableHeadCell>
    );
  });

  renderRow = (id, columns) => (
    <Row
      key={`appointment-${id}-row`}
      id={id}
      columns={columns}
    />
  );

  renderRows = () => {
    const columns = TABLE_COLUMNS.map(c => c.value);
    return this.props.recordIds.map(id => this.renderRow(id, columns));
  };

  renderBody = () => {
    const hasRecords = !!this.props.recordIds.length;

    if (this.props.loading && !hasRecords) {
      return this.renderLoadingState();
    }

    if (hasRecords) {
      return this.renderRows();
    }

    return this.renderEmptyState();
  };

  render() {
    return (
      <Table className="appointments__table">
        <TableHead>
          <TableRow>
            {this.renderColumnHeaders()}
          </TableRow>
        </TableHead>
        <TableBody className="body">
          {this.renderBody()}
        </TableBody>
      </Table>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { findCurrentCollection, isLoading } from 'modules/appointments/selectors';
import { selectors as routerSelectors, actions as routerActions } from 'modules/router';

const recordIdsSelector = state => {
  const currentCollection = findCurrentCollection(state);
  return currentCollection ? currentCollection.ids : [];
};

export default connect(
  createStructuredSelector({
    recordIds: recordIdsSelector,
    sortBy: state => routerSelectors.getQuery(state).sortBy,
    sortAscending: state => routerSelectors.getQuery(state).sortDirection === 'asc',
    loading: state => isLoading(state),
  }),
  createStructuredActions({
    updateSort: (sortBy, sortAscending) => routerActions.pushQuery({
      page: 1,
      sortBy,
      sortDirection: sortAscending ? 'asc' : 'desc',
    }),
  }),
)(AppointmentsTable);
