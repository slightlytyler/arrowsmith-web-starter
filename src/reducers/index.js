import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import user from 'modules/user/reducers';
import subscriptions from 'modules/subscriptions/reducers';
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
  subscriptions,
  [PROJECTS_KEY]: projectsReducer,
  [GOALS_KEY]: goalsReducer,
});
