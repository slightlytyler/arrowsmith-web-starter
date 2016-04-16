import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as mutations from 'utils/mutations';
import * as actionTypes from './actionTypes';
import { CLEAR_CURRENT_USER } from 'modules/user/constants';

const records = handleActions({
  [actionTypes.CREATE_PROJECT]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_PROJECT]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_PROJECT]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_PROJECT]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_PROJECTS]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  [CLEAR_CURRENT_USER]: {
    next: mutations.dropRecords,
    throw: mutations.handleError,
  },
}, []);

export default combineReducers({ records });
