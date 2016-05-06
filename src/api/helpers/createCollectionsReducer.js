import { findIndex, isEqual, without } from 'lodash';
import { assoc } from 'react-update-in';

const currentColletionIndex = (collections, query) => (
  findIndex(collections, c => isEqual(c.query, query))
);

// Create reducer for handling collections of remote records
export default actionTypes => (state = [], { type, payload, meta }) => {
  switch (type) {
    case actionTypes.FETCH_COLLECTION_REQUEST: {
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

    case actionTypes.FETCH_COLLECTION_SUCCESS: {
      const index = currentColletionIndex(state, payload.query);

      return assoc(state, index, {
        ...state[index],
        loading: false,
        ids: payload.data.map(record => record.id),
      });
    }

    case actionTypes.DELETE_RECORD_REQUEST: {
      return state.map(collection =>
        assoc(collection, 'ids', without(collection.ids, meta.optimistic.payload.id))
      );
    }

    default:
      return state;
  }
};