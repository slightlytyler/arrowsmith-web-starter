import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as mutations from 'utils/mutations';
import * as actionTypes from './actionTypes';
import { CLEAR_CURRENT_USER } from 'modules/user/constants';

const recordIds = handleActions({
  [actionTypes.CREATE_SUBSCRIPTION]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_SUBSCRIPTION]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_SUBSCRIPTION]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_SUBSCRIPTION]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_SUBSCRIPTIONS]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  [CLEAR_CURRENT_USER]: {
    next: mutations.dropRecords,
    throw: mutations.handleError,
  },
}, []);

const recordsById = handleActions({
  [actionTypes.CREATE_SUBSCRIPTION]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_SUBSCRIPTION]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_SUBSCRIPTION]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_SUBSCRIPTION]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_SUBSCRIPTIONS]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  [CLEAR_CURRENT_USER]: {
    next: mutations.dropRecords,
    throw: mutations.handleError,
  },
}, {});


export default combineReducers({ recordIds, recordsById });
