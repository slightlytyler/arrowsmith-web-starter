import { push as pushRoute } from 'react-router-redux';
import { createApiAction } from 'api/client';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const viewRecord = id => pushRoute(`/projects/${id}/goals/active`);

export const viewIndex = () => pushRoute('/projects');

export const createRecord = name => createApiAction(
  [
    actionTypes.CREATE_RECORD_REQUEST,
    actionTypes.CREATE_RECORD_SUCCESS,
    actionTypes.CREATE_RECORD_FAILURE,
  ],
  service.createRecord,
)(name);

export const updateRecord = (id, payload) => createApiAction(
  [
    actionTypes.UPDATE_RECORD_REQUEST,
    actionTypes.UPDATE_RECORD_SUCCESS,
    actionTypes.UPDATE_RECORD_FAILURE,
  ],
  service.updateRecord,
)(id, payload);

export const replaceRecord = (id, payload) => createApiAction(
  [
    actionTypes.REPLACE_RECORD_REQUEST,
    actionTypes.REPLACE_RECORD_SUCCESS,
    actionTypes.REPLACE_RECORD_FAILURE,
  ],
  service.replaceRecord,
)(id, payload);

export const deleteRecord = id => createApiAction(
  [
    actionTypes.DELETE_RECORD_REQUEST,
    actionTypes.DELETE_RECORD_SUCCESS,
    actionTypes.DELETE_RECORD_FAILURE,
  ],
  service.deleteRecord,
)(id);

export const fetchRecord = id => createApiAction(
  [
    actionTypes.FETCH_RECORD_REQUEST,
    actionTypes.FETCH_RECORD_SUCCESS,
    actionTypes.FETCH_RECORD_FAILURE,
  ],
  service.fetchRecord,
)(id);

export const fetchCollection = query => createApiAction(
  [
    actionTypes.FETCH_COLLECTION_REQUEST,
    actionTypes.FETCH_COLLECTION_SUCCESS,
    actionTypes.FETCH_COLLECTION_FAILURE,
  ],
  service.fetchCollection,
  {
    request: { payload: { query } },
    success: {
      payload: (action, state, res) => res.json().then(json => Object.assign({}, json, { query })),
    },
    failure: { payload: { query } },
  }
)(query);
