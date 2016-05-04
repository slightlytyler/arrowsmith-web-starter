import { updateIn, assoc, dissoc, merge } from 'react-update-in';
import { createRecordsById } from 'utils';

// Create reducer for handling records dictionary
export default actionTypes => (state = {}, { type, payload, meta }) => {
  switch (type) {
    case actionTypes.CREATE_RECORD_REQUEST:
    case actionTypes.REPLACE_RECORD_REQUEST:
      return assoc(state, meta.optimistic.payload.id, meta.optimistic.payload);

    case actionTypes.UPDATE_RECORD_REQUEST:
      return updateIn(state, [meta.optimistic.payload.id], merge, meta.optimistic.payload);

    case actionTypes.DELETE_RECORD_REQUEST:
      return dissoc(state, meta.optimistic.payload.id);

    case actionTypes.CREATE_RECORD_SUCCESS:
    case actionTypes.UPDATE_RECORD_SUCCESS:
    case actionTypes.REPLACE_RECORD_SUCCESS:
    case actionTypes.FETCH_RECORD_SUCCESS:
      return assoc(state, payload.id, payload);

    case actionTypes.DELETE_RECORD_SUCCESS:
      return dissoc(state, payload.id);

    case actionTypes.FETCH_COLLECTION_SUCCESS:
      return { ...state, ...createRecordsById(payload.data) };

    default:
      return state;
  }
};
