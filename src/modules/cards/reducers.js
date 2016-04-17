import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';
import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_CARD,
} from 'modules/cards/constants';
import { CLEAR_CURRENT_USER } from 'modules/user/constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_CARD: {
      const index = findIndex(state, record => record.id === payload.id);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case UPDATE_CARD: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case DELETE_CARD: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case SET_CARD:
      return [...state, payload];

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default combineReducers({
  records,
});
