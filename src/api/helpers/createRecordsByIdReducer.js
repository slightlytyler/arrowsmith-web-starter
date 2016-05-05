import { updateIn, assoc, dissoc, merge } from 'react-update-in';
import { createRecordsById } from 'utils';

// Create reducer for handling records dictionary
export default actionTypes => (state = {}, { type, payload, meta }) => {
  switch (type) {
    case actionTypes.CREATE_RECORD_REQUEST:
    case actionTypes.REPLACE_RECORD_REQUEST: {
      if (meta && meta.optimistic) {
        return assoc(state, meta.optimistic.payload.id, meta.optimistic.payload);
      }
      return state;
    }

    case actionTypes.UPDATE_RECORD_REQUEST: {
      if (meta && meta.optimistic) {
        return updateIn(state, [meta.optimistic.payload.id], merge, meta.optimistic.payload);
      }
      return state;
    }

    case actionTypes.DELETE_RECORD_REQUEST: {
      if (meta && meta.optimistic) {
        return dissoc(state, meta.optimistic.payload.id);
      }
      return state;
    }

    case actionTypes.CREATE_RECORD_SUCCESS:
    case actionTypes.UPDATE_RECORD_SUCCESS:
    case actionTypes.REPLACE_RECORD_SUCCESS:
    case actionTypes.FETCH_RECORD_SUCCESS:
      return assoc(state, payload.id, payload);

    case actionTypes.FETCH_COLLECTION_SUCCESS:
      return { ...state, ...createRecordsById(payload.data) };

    default:
      return state;
  }
};
