import React, { Component, PropTypes } from 'react';
import { Button, Pagination } from 'react-portland-ui';
import { Filter as GroupsFilter } from 'modules/groups/components';
import { Filter as ProvidersFilter } from 'modules/providers/components';
import Table from '../Table';

export class AppointmentsRoot extends Component {
  static propTypes = {
    providerIds: PropTypes.array,
    query: PropTypes.object,
    actions: PropTypes.shape({
      fetchCollection: PropTypes.func.isRequired,
      addRecord: PropTypes.func.isRequired,
      updateQuery: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    const { providerIds, query } = this.props;

    if (providerIds.length) this.props.actions.fetchCollection({ providerIds, ...query });
  }

  componentWillUpdate(nextProps) {
    if (this.props.providerIds !== nextProps.providerIds || this.props.query !== nextProps.query) {
      this.props.actions.fetchCollection({
        providerIds: nextProps.providerIds,
        ...nextProps.query,
      });
    }
  }

  getCurrentPage = () => (
    this.props.query.page
      ? Number(this.props.query.page)
      : 1
  );

  getTotalPages = () => (
    this.props.query.totalPages
      ? Number(this.props.query.totalPages)
      : 1
  );

  render() {
    return (
      <div className="appointments__root container--outer">
        <nav className="nav">
          <section className="filters">
            <GroupsFilter className="groups input" />
            <ProvidersFilter className="providers input" />
          </section>
          <Button
            className="button"
            onClick={this.props.actions.addRecord}
          >
            Add Appointment
          </Button>
        </nav>
        <header className="pagination">
          <Pagination
            currentPage={this.getCurrentPage()}
            totalPages={this.getTotalPages()}
            onChange={this.props.actions.updateQuery}
          />
        </header>
        <Table />
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStructuredActions } from 'helpers/actions';
import { fetchCollection } from 'modules/appointments/actions';
import { selectors as providersSelectors } from 'modules/providers';
import { selectors as routerSelectors, actions as routerActions } from 'modules/router';

export default connect(
  createStructuredSelector({
    providerIds: providersSelectors.getSelectedItems,
    query: routerSelectors.getQuery,
  }),
  createStructuredActions({
    fetchCollection,
    addRecord: () => routerActions.pushRelativeRoute('new'),
    updateQuery: page => routerActions.pushQuery({ page }),
  }),
)(AppointmentsRoot);
