import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import firebase from './firebase';
import { reducer as auth } from 'pods/auth/model';
import projects from 'pods/projects/reducers';
import goals from 'pods/goals/reducers';

export default combineReducers({
  router,
  storage,
  firebase,
  auth,
  projects,
  goals,
});
