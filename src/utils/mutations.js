/* eslint-disable no-console */

import { push, assoc, dissoc } from 'react-update-in';
import { union, map } from 'lodash';
import createRecordsById from 'utils/createRecordsById';

export const createRecord = (state, { payload }) => {
  if (Array.isArray(state)) return push(state, [payload.id]);
  return assoc(state, payload.id, payload);
};

export const updateRecord = (state, { payload }) => {
  if (Array.isArray(state)) return state;
  return assoc(state, payload.id, payload);
};

export const destroyRecord = (state, { payload }) => {
  if (Array.isArray(state)) return dissoc(state, state.indexOf(payload.id));
  return dissoc(state, payload.id);
};

export const getRecord = (state, { payload }) => {
  if (Array.isArray(state)) {
    if (state.indexOf(payload.id) === -1) return push(state, [payload.id]);
    return state;
  }

  return assoc(state, payload.id, payload);
};

export const fetchRecords = (state, { payload }) => {
  if (Array.isArray(state)) return union(state, map(payload, 'id'));
  return Object.assign({}, state, createRecordsById(payload));
};

export const dropRecords = state => {
  if (Array.isArray(state)) return [];
  return {};
};

export const handleError = (state, { payload }) => {
  console.log(payload);
  return state;
};
