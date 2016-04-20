import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { without, mapValues } from 'lodash';
import { CLEAR_STORE } from 'constants/actionTypes';
import storage from './storage';
import {
  NAME as USER_KEY,
  reducer as userReducer,
} from 'modules/user';
import {
  NAME as SUBSCRIPTIONS_KEY,
  reducer as subscriptionsReducer,
} from 'modules/subscriptions';
import {
  NAME as CARDS_KEY,
  reducer as cardsReducer,
} from 'modules/cards';
import {
  NAME as PROJECTS_KEY,
  reducer as projectsReducer,
} from 'modules/projects';
import {
  NAME as GOALS_KEY,
  reducer as goalsReducer,
} from 'modules/goals';

const reducer = combineReducers({
  router,
  storage,
  [USER_KEY]: userReducer,
  [SUBSCRIPTIONS_KEY]: subscriptionsReducer,
  [CARDS_KEY]: cardsReducer,
  [PROJECTS_KEY]: projectsReducer,
  [GOALS_KEY]: goalsReducer,
});

const staticModules = ['router', 'storage'];

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_STORE: {
      const keysToClear = without(Object.keys(state), ...staticModules);
      return mapValues(state, (value, key) => {
        if (keysToClear.indexOf(key) !== -1) return {};
        return value;
      });
    }

    default:
      return reducer(state, action);
  }
};
