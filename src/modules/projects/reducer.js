import { combineReducers } from 'redux';
import {
  createCollectionsReducer,
  createRecordsByIdReducer,
  createCurrentQueryReducer,
} from 'api/helpers';
import * as actionTypes from './actionTypes';

export default combineReducers({
  collections: createCollectionsReducer(actionTypes),
  recordsById: createRecordsByIdReducer(actionTypes),
  currentQuery: createCurrentQueryReducer(actionTypes),
});
