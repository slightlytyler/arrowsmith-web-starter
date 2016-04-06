import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { findIndex } from 'lodash';

import { CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from 'pods/goals/constants';
import { CLEAR_CURRENT_USER } from 'pods/user/model';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case UPDATE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case DELETE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default combineReducers({
  records,
});
