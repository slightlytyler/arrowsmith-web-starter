import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';
import {
  CREATE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  SET_SUBSCRIPTION,
} from 'pods/subscriptions/constants';
import { CLEAR_CURRENT_USER } from 'pods/user/constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_SUBSCRIPTION: {
      const index = findIndex(state, record => record.id === payload.id);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case UPDATE_SUBSCRIPTION: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case DELETE_SUBSCRIPTION: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case SET_SUBSCRIPTION:
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
