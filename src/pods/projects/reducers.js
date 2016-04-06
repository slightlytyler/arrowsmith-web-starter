import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';

import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_PROJECTS,
} from './constants';
import { CLEAR_CURRENT_USER } from 'pods/user/constants';

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

    case SET_PROJECTS:
      return [...state, ...payload];

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default combineReducers({ records });
