import { combineReducers } from 'redux';
import { LOAD_COMPLETE } from 'constants/actionTypes';

function loaded(state = false, { type }) {
  switch (type) {
    case LOAD_COMPLETE:
      return true;

    default:
      return state;
  }
}

export default combineReducers({ loaded });
