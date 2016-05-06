import { combineReducers } from 'redux';
import { createCollectionsReducer, createRecordsByIdReducer } from 'api/helpers';
import * as actionTypes from './actionTypes';

export default combineReducers({
  collections: createCollectionsReducer(actionTypes),
  recordsById: createRecordsByIdReducer(actionTypes),
});
