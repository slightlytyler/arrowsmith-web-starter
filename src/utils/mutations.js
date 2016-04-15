import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';

export const createRecord = (state, { payload }) => {
  const index = findIndex(state, record => record.id === payload);
  if (index === -1) {
    return push(state, [payload]);
  }
  return assoc(state, index, payload);
};

export const updateRecord = (state, { payload }) => {
  const index = findIndex(state, record => record.id === payload.id);
  return assoc(state, index, payload);
};

export const deleteRecord = (state, { payload }) => {
  const index = findIndex(state, record => record.id === payload.id);
  return dissoc(state, index);
};

export const fetchRecord = (state, { payload }) => [...state, payload];

export const fetchRecords = (state, { payload }) => [...state, ...payload];

export const dropRecords = () => ([]);

export const handleError = (state, { payload }) => { throw (payload); };
