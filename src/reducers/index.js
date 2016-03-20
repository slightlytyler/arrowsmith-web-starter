import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as goals } from 'pods/goal/model';

export default combineReducers({
  router,
  goals,
});
