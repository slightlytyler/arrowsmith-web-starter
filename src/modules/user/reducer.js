import { handleActions } from 'redux-actions';
import * as mutations from 'utils/mutations';
import * as actionTypes from './actionTypes';

const setUser = (state, { payload }) => payload;
const updateUser = (state, { payload }) => Object.assign({}, state, payload);
const dropUser = () => ({});

export default handleActions({
  [actionTypes.CREATE_USER]: {
    next: setUser,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_USER]: {
    next: updateUser,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_USER]: {
    next: dropUser,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH_USER]: {
    next: updateUser,
    throw: mutations.handleError,
  },
  [actionTypes.AUTHORIZE_USER]: {
    next: setUser,
    throw: mutations.handleError,
  },
  [actionTypes.UNAUTHORIZE_USER]: {
    next: dropUser,
    throw: mutations.handleError,
  },
}, {});
