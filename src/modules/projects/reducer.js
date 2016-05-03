import { combineReducers } from 'redux';
import { isEqual } from 'lodash';
import { assoc, dissoc } from 'react-update-in';
import { createRecordsById } from 'utils';
import * as actionTypes from './actionTypes';

export default combineReducers({
  collections: (state = [], { type, payload }) => {
    switch (type) {
      case actionTypes.api.FETCH_COLLECTION_REQUEST:
        return [...state, {
          query: payload.query,
          loading: true,
          ids: [],
        }];

      case actionTypes.api.FETCH_COLLECTION_SUCCESS:
        return state.map(collection => isEqual(collection.query, payload.query)
          ? { ...collection, loading: false, ids: payload.data.map(record => record.id) }
          : collection
        );

      default:
        return state;
    }
  },
  recordsById: (state = {}, { type, payload }) => {
    switch (type) {
      case actionTypes.api.CREATE_RECORD_SUCCESS:
      case actionTypes.api.UPDATE_RECORD_SUCCESS:
      case actionTypes.api.REPLACE_RECORD_SUCCESS:
      case actionTypes.api.FETCH_RECORD_SUCCESS:
        return assoc(state, payload.id, payload);

      case actionTypes.api.DELETE_RECORD_SUCCESS:
        return dissoc(state, payload.id);

      case actionTypes.api.FETCH_COLLECTION_SUCCESS:
        return { ...state, ...createRecordsById(payload.data) };

      default:
        return state;
    }
  },
});
