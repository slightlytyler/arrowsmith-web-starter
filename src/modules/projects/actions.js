import { push as pushRoute } from 'react-router-redux';
import { createAction } from 'api/client';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const viewRecord = id => pushRoute(`/projects/${id}/goals/active`);

export const viewIndex = () => pushRoute('/projects');

export const createRecord = name => createAction(
  actionTypes.api.createRecord,
  service.createRecord,
)(name);

export const updateRecord = (id, payload) => createAction(
  actionTypes.api.updateRecord,
  service.updateRecord,
)(id, payload);

export const replaceRecord = (id, payload) => createAction(
  actionTypes.api.replaceRecord,
  service.replaceRecord,
)(id, payload);

export const deleteRecord = id => createAction(
  actionTypes.api.deleteRecord,
  service.deleteRecord,
)(id);

export const fetchRecord = id => createAction(
  actionTypes.api.fetchRecord,
  service.fetchRecord,
)(id);

export const fetchCollection = query => createAction(
  actionTypes.api.fetchCollection,
  service.fetchCollection,
  {
    request: { payload: { query } },
    success: {
      payload: (action, state, res) => res.json().then(json => Object.assign({}, json, { query })),
    },
    failure: { payload: { query } },
  }
)(query);
