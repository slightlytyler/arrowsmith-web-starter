import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import firebase from './firebase';
import { reducer as user } from 'pods/user/model';
import projects from 'pods/projects/reducers';
import goals from 'pods/goals/reducers';

export default combineReducers({
  router,
  storage,
  firebase,
  user,
  projects,
  goals,
});
