import { BEGIN, COMMIT, REVERT } from 'redux-optimist-prime';
import generateId from 'shortid';
import { isDirty } from 'helpers/data';
import * as actionTypes from './actionTypes';
import { findRecord } from './selectors';
import { actions as routerActions } from 'modules/router';

export const transitionToIndex = () => routerActions.pushRoute('/appointments');

export const createRecord = attrs => {
  const transactionId = generateId();

  return {
    type: actionTypes.createRecord.pending,
    payload: attrs,
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  };
};

createRecord.success = (id, payload) => ({
  type: actionTypes.createRecord.success,
  payload,
  meta: {
    optimistic: { type: REVERT, id },
  },
});

createRecord.failure = (id, error) => ({
  type: actionTypes.createRecord.failure,
  payload: { error },
  meta: {
    optimistic: { type: REVERT, id },
  },
});

export const updateRecord = (id, attrs) => (dispatch, getState) => {
  const record = findRecord(getState(), id);

  if (attrs && isDirty(record, attrs)) {
    dispatch({
      type: actionTypes.updateRecord.pending,
      payload: { id, ...attrs },
      meta: {
        optimistic: { type: BEGIN, id },
      },
    });
  } else {
    dispatch(transitionToIndex());
  }
};

updateRecord.success = (id, payload) => ({
  type: actionTypes.updateRecord.success,
  payload,
  meta: {
    optimistic: { type: REVERT, id },
  },
});

updateRecord.failure = (id, error) => ({
  type: actionTypes.updateRecord.failure,
  payload: { error },
  meta: {
    optimistic: { type: REVERT, id },
  },
});

export const deleteRecord = id => ({
  type: actionTypes.deleteRecord.pending,
  payload: { id },
  meta: {
    optimistic: { type: BEGIN, id },
  },
});

deleteRecord.success = (id, payload) => ({
  type: actionTypes.deleteRecord.success,
  payload,
  meta: {
    optimistic: { type: COMMIT, id },
  },
});

deleteRecord.failure = (id, error) => ({
  type: actionTypes.deleteRecord.failure,
  payload: { error },
  meta: {
    optimistic: { type: REVERT, id },
  },
});

export const fetchRecord = id => ({
  type: actionTypes.fetchRecord.pending,
  payload: { id },
  meta: {
    optimistic: { type: BEGIN, id },
  },
});

fetchRecord.success = (id, payload) => ({
  type: actionTypes.fetchRecord.success,
  payload,
  meta: {
    optimistic: { type: REVERT, id },
  },
});

fetchRecord.failure = (id, error) => ({
  type: actionTypes.fetchRecord.failure,
  payload: { error },
  meta: {
    optimistic: { type: REVERT, id },
  },
});

export const fetchCollection = (query = {}) => ({
  type: actionTypes.fetchCollection.pending,
  payload: { query },
});

fetchCollection.success = (query, payload) => ({
  type: actionTypes.fetchCollection.success,
  payload: { query, records: payload },
});

fetchCollection.failure = (query, error) => ({
  type: actionTypes.fetchCollection.failure,
  payload: { query, error },
});

export const printRecord = id => ({
  type: actionTypes.printRecord.pending,
  payload: { id },
});

printRecord.success = payload => ({
  type: actionTypes.printRecord.success,
  payload,
});

printRecord.failure = id => ({
  type: actionTypes.printRecord.failure,
  payload: { id },
});
