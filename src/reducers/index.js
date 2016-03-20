import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import firebase from './firebase';
import { reducer as goals } from 'pods/goal/model';

export default combineReducers({
  router,
  firebase,
  goals,
});
