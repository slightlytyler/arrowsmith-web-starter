import { combineReducers } from 'redux';
import { LOAD } from 'redux-storage';

function loaded(state = false, { type }) {
  switch (type) {
    case LOAD:
      return true;

    default:
      return state;
  }
}

export default combineReducers({ loaded });
