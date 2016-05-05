import { combineReducers } from 'redux';
import { createRecordsByIdReducer } from 'api/helpers';
import * as actionTypes from './actionTypes';

export default combineReducers({
  recordsById: createRecordsByIdReducer(actionTypes.api),
});
