import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';

import * as actionTypes from './actionTypes';
import { CLEAR_CURRENT_USER } from 'pods/user/constants';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.CREATE_PROJECT: {
      const index = findIndex(state, record => record.id === payload);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case actionTypes.UPDATE_PROJECT: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case actionTypes.DELETE_PROJECT: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case actionTypes.FETCH_PROJECT:
      return [...state, payload];

    case actionTypes.FETCH_PROJECTS:
      return [...state, ...payload];

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default combineReducers({ records });
