import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import firebase from './firebase';
import { reducer as auth } from 'pods/auth/model';
import { reducer as goals } from 'pods/goal/model';
import { reducer as projects } from 'pods/project/model';

export default combineReducers({
  router,
  firebase,
  auth,
  goals,
  projects,
});
