import { handleActions } from 'redux-actions';
import { mutations } from 'utils';
import * as actionTypes from './actionTypes';

const set = (state, { payload }) => payload;
const update = (state, { payload }) => Object.assign({}, state, payload);
const drop = () => ({});

export default handleActions({
  [actionTypes.CREATE]: {
    next: set,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE]: {
    next: update,
    throw: mutations.handleError,
  },
  [actionTypes.DELETE]: {
    next: drop,
    throw: mutations.handleError,
  },
  [actionTypes.GET]: {
    next: update,
    throw: mutations.handleError,
  },
  [actionTypes.AUTHORIZE]: {
    next: set,
    throw: mutations.handleError,
  },
  [actionTypes.UNAUTHORIZE]: {
    next: drop,
    throw: mutations.handleError,
  },
}, {});
