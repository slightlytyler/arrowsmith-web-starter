import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { map, mapValues, zipObject, without } from 'lodash';
import { CLEAR_STORE } from 'constants/actionTypes';
import storage from './storage';
import * as modules from 'modules';

const reducer = combineReducers({
  router,
  storage,
  ...zipObject(map(modules, m => m.NAME), map(modules, m => m.reducer)),
});

const staticModules = ['router', 'storage'];

export default (state = {}, action) => {
  switch (action.type) {
    case CLEAR_STORE: {
      const keysToClear = without(Object.keys(state), ...staticModules);
      return mapValues(state, (value, key) => {
        if (keysToClear.indexOf(key) !== -1) return {};
        return value;
      });
    }

    default:
      return reducer(state, action);
  }
};
