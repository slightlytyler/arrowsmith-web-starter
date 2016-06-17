import * as actionTypes from './actionTypes';

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

export const selectItems = ids => ({
  type: actionTypes.SELECT_ITEMS,
  payload: { ids },
});
