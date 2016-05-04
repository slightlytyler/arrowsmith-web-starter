import { isEqual } from 'lodash';

// Create reducer for handling collections of remote records
export default actionTypes => (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_COLLECTION_REQUEST:
      return [...state, {
        query: payload.query,
        loading: true,
        ids: [],
      }];

    case actionTypes.FETCH_COLLECTION_SUCCESS:
      return state.map(collection => (
        isEqual(collection.query, payload.query)
          ? { ...collection, loading: false, ids: payload.data.map(record => record.id) }
          : collection
      ));

    default:
      return state;
  }
};
