import { combineReducers } from 'redux';
import { recordIds, recordsById } from 'reducers/generators';
import * as actionTypes from './actionTypes';

export default combineReducers({
  recordIds: recordIds(actionTypes),
  recordsById: recordsById(actionTypes),
});
