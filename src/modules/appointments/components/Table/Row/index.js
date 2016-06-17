import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { TableRow, TableCell, Icon } from 'react-portland-ui';
import checkIcon from 'icons/check.svg';
import printIcon from 'icons/print.svg';
import viewIcon from 'icons/view.svg';
import editIcon from 'icons/edit.svg';

const ACTIONS = 'ACTIONS';

export class AppointmentsTableRow extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    rowData: PropTypes.array,
    actions: PropTypes.shape({
      edit: PropTypes.func.isRequired,
      view: PropTypes.func.isRequired,
      print: PropTypes.func.isRequired,
    }),
  };

  renderCheckmark = () => <Icon path={checkIcon} className="check icon" />;

  renderActions = () => (
    <div className="actions">
      <Icon path={printIcon} onClick={this.props.actions.print} />
      <Icon path={viewIcon} onClick={this.props.actions.view} />
      <Icon path={editIcon} onClick={this.props.actions.edit} />
    </div>
  );

  renderCellContent = ({ value }) => {
    if (typeof value === 'boolean') return value ? this.renderCheckmark() : '';
    if (value === ACTIONS) return this.renderActions();
    return value;
  };

  renderCell = cellData => (
    <TableCell
      key={`appointment-${this.props.id}-column-${cellData.column}`}
      className="cell"
    >
      {this.renderCellContent(cellData)}
    </TableCell>
  );

  renderCells = () => this.props.rowData.map(this.renderCell);

  render() {
    return (
      <TableRow className="row">
        {this.renderCells()}
      </TableRow>
    );
  }
}

import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { getRecordsById } from 'modules/appointments/selectors';
import { printRecord } from 'modules/appointments/actions';
import { selectors as providersSelectors } from 'modules/providers';
import { selectors as groupsSelectors } from 'modules/groups';
import { actions as routerActions } from 'modules/router';

const idSelector = (state, props) => props.id;

const columnsSelector = (state, props) => props.columns;

const recordSelector = createSelector(
  getRecordsById,
  idSelector,
  (recordsById, id) => recordsById[id]
);

const cellValue = (column, record, providersById, groupsById) => {
  const value = record[column];

  switch (column) {
    case 'actions':
      return ACTIONS;

    case 'reminded':
      return Object.values(value).some(v => v);

    case 'providerId':
      return providersById[value]
        ? providersById[value].name
        : `Provider ${value}`;

    case 'groupId':
      return groupsById[value]
        ? groupsById[value].name
        : `Group ${value}`;

    case 'date':
      return moment(new Date(value)).format('MMMM Do YYYY, h:mm A');

    default:
      return value;
  }
};

const rowDataSelector = createSelector(
  columnsSelector,
  recordSelector,
  providersSelectors.getRecordsById,
  groupsSelectors.getRecordsById,
  (columns, record, providersById, groupsById) => columns.map(column => ({
    column,
    value: cellValue(column, record, providersById, groupsById),
  }))
);

const editAction = id => routerActions.pushRelativeRoute(`${id}/edit`);

const viewAction = id => routerActions.pushRelativeRoute(`${id}`);

export default connect(
  createStructuredSelector({
    id: idSelector,
    rowData: rowDataSelector,
  }),
  (dispatch, props) => () => createStructuredActions({
    edit: () => editAction(props.id),
    view: () => viewAction(props.id),
    print: () => printRecord(props.id),
  }, dispatch)
)(AppointmentsTableRow);
