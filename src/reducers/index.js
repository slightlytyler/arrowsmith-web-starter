import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import user from 'modules/user/reducers';
import {
  NAME as SUBSCRIPTIONS_KEY,
  reducer as subscriptionsReducer,
} from 'modules/subscriptions';
import cards from 'modules/cards/reducers';
import {
  NAME as PROJECTS_KEY,
  reducer as projectsReducer,
} from 'modules/projects';
import {
  NAME as GOALS_KEY,
  reducer as goalsReducer,
} from 'modules/goals';

export default combineReducers({
  router,
  storage,
  user,
  [SUBSCRIPTIONS_KEY]: subscriptionsReducer,
  cards,
  [PROJECTS_KEY]: projectsReducer,
  [GOALS_KEY]: goalsReducer,
});
