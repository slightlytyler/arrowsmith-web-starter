import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as mutations from 'utils/mutations';
import * as actionTypes from './actionTypes';
import { actionTypes as userActionTypes } from 'modules/user';

const recordIds = handleActions({
  [actionTypes.CREATE_GOAL]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_GOAL]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_GOAL]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_GOAL]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_GOALS]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  [userActionTypes.UNAUTHORIZE_USER]: {
    next: mutations.dropRecords,
    throw: mutations.handleError,
  },
}, []);

const recordsById = handleActions({
  [actionTypes.CREATE_GOAL]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_GOAL]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_GOAL]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_GOAL]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_GOALS]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  [userActionTypes.UNAUTHORIZE_USER]: {
    next: mutations.dropRecords,
    throw: mutations.handleError,
  },
}, {});

export default combineReducers({ recordIds, recordsById });
