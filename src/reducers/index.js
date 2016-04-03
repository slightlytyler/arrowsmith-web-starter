import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import storage from './storage';
import firebase from './firebase';
import { reducer as auth } from 'pods/auth/model';
import { reducer as goals } from 'pods/goal/model';
import projects from 'pods/projects/reducers';

export default combineReducers({
  router,
  storage,
  firebase,
  auth,
  goals,
  projects,
});
