import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import user from 'modules/user/reducers';
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

export default combineReducers({
  router,
  storage,
  user,
  [SUBSCRIPTIONS_KEY]: subscriptionsReducer,
  [CARDS_KEY]: cardsReducer,
  [PROJECTS_KEY]: projectsReducer,
  [GOALS_KEY]: goalsReducer,
});
