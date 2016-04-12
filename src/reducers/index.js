import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import user from 'pods/user/reducers';
import subscriptions from 'pods/subscriptions/reducers';
import projects from 'pods/projects/reducers';
import goals from 'pods/goals/reducers';

export default combineReducers({
  router,
  storage,
  user,
  subscriptions,
  projects,
  goals,
});
