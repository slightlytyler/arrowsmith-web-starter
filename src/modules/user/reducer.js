import { handleActions } from 'redux-actions';
import * as mutations from 'utils/mutations';
import * as actionTypes from './actionTypes';

export default handleActions({
  [actionTypes.CREATE_USER]: {
    next: (state, { payload }) => payload,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE_USER]: {
    next: (state, { payload }) => payload,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE_USER]: {
    next: () => ({}),
    throw: mutations.handleError,
  },
  [actionTypes.AUTHORIZE_USER]: {
    next: (state, { payload }) => payload,
    throw: mutations.handleError,
  },
  [actionTypes.UNAUTHORIZE_USER]: {
    next: () => ({}),
    throw: mutations.handleError,
  },
}, {});
