import { combineReducers } from 'redux';
import {
  createCollectionsReducer,
  createRecordsByIdReducer,
  createCurrentQueryReducer,
} from 'helpers/reducers';
import * as actionTypes from './actionTypes';

const conditionShape = {
  selectedItems: [],
};

export const condition = (state = conditionShape, { type, payload }) => {
  switch (type) {
    case actionTypes.SELECT_ITEMS:
      return { ...state, selectedItems: payload.ids };

    default:
      return state;
  }
};

export default combineReducers({
  collections: createCollectionsReducer(actionTypes),
  recordsById: createRecordsByIdReducer(actionTypes),
  currentQuery: createCurrentQueryReducer(actionTypes),
  condition,
});
