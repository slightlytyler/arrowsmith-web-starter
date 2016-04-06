import { combineReducers } from 'redux';

function loaded(state = false, { type }) {
  switch (type) {
    case 'LOAD_COMPLETE':
      return true;

    default:
      return state;
  }
}

export default combineReducers({ loaded });
