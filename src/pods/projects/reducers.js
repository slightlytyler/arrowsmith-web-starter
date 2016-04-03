import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';

import { actionTypes } from './constants';
const { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } = actionTypes;
import { CLEAR_CURRENT_USER } from 'pods/auth/model';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_PROJECT: {
      const index = findIndex(state, record => record.id === payload.id);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case UPDATE_PROJECT: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case DELETE_PROJECT: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default combineReducers({ records });
