import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as todos } from 'pods/todo/model';

export default combineReducers({
  router,
  todos,
});
