import { combineReducers } from 'redux';
import { findIndex, isEqual, without } from 'lodash';
import { updateIn, assoc, dissoc, merge } from 'react-update-in';
import { createRecordsById } from 'utils';
import * as actionTypes from './actionTypes';

const currentColletionIndex = (collections, query) => (
  findIndex(collections, c => isEqual(c.query, query))
);

const actionTypesShape = {
  createRecord: {},
  updateRecord: {},
  replaceRecord: {},
  deleteRecord: {},
  fetchRecord: {},
  fetchCollection: {},
};

const createCollectionsReducer = moduleActionTypes => (state = [], { type, payload }) => {
  const actionTypes = { ...actionTypesShape, ...moduleActionTypes };

  switch (type) {
    case actionTypes.fetchCollection.pending: {
      const index = currentColletionIndex(state, payload.query);

      if (index !== -1) {
        return assoc(state, index, {
          ...state[index],
          loading: true,
        });
      }

      return [...state, {
        query: payload.query,
        loading: true,
        ids: [],
      }];
    }

    case actionTypes.fetchCollection.success: {
      const index = currentColletionIndex(state, payload.query);

      return assoc(state, index, {
        ...state[index],
        loading: false,
        ids: payload.ids.map(record => record.id),
      });
    }

    case actionTypes.deleteRecord.pending: {
      return state.map(collection =>
        assoc(collection, 'ids', without(collection.ids, payload.id))
      );
    }

    default:
      return state;
  }
};

const createRecordsByIdReducer = moduleActionTypes => (state = {}, { type, payload }) => {
  const actionTypes = { ...actionTypesShape, ...moduleActionTypes };

  switch (type) {
    case actionTypes.createRecord.pending:
    case actionTypes.replaceRecord.pending:
      return assoc(state, payload.id, payload);

    case actionTypes.updateRecord.pending:
      return updateIn(state, [payload.id], merge, payload);

    case actionTypes.deleteRecord.pending:
      return dissoc(state, payload.id);

    case actionTypes.createRecord.success:
    case actionTypes.updateRecord.success:
    case actionTypes.replaceRecord.success:
    case actionTypes.fetchRecord.success:
      return assoc(state, payload.id, payload);

    case actionTypes.fetchCollection.success:
      return { ...state, ...createRecordsById(payload.ids) };

    default:
      return state;
  }
}

export default combineReducers({
  collections: createCollectionsReducer(actionTypes),
  recordsById: createRecordsByIdReducer(actionTypes),
});

