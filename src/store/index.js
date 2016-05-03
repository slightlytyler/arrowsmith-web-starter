import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { apiMiddleware } from 'redux-api-middleware';
import * as storage from 'redux-storage';
import { root as rootReducer } from 'reducers';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { getModuleAtoms } from 'utils';
import { LOCAL_STORAGE_KEY } from 'config';
import { CLEAR_STORE, LOAD_COMPLETE } from 'constants/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as modules from 'modules';

const engine = filter(
  createEngine(LOCAL_STORAGE_KEY),
  ['user'],
);

const { actionTypes: userActionTypes } = modules.user;
const storageMiddleware = storage.createMiddleware(
  engine,
  [LOCATION_CHANGE],
  [
    CLEAR_STORE,
    ...Object.values(userActionTypes),
  ],
);

const load = storage.createLoader(engine);
const reducer = storage.reducer(rootReducer);

export default function configureStore(initialState = {}, routerMiddleware) {
  // Compose final middleware
  const middleware = applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    promiseMiddleware,
    routerMiddleware,
    storageMiddleware,
    ...getModuleAtoms(modules, 'middleware')
  );

  // Create final store and subscribe router in debug env ie. for devtools
  const store = compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  load(store).then(() => {
    const { dispatch, getState } = store;

    // Handle hooks
    getModuleAtoms(modules, 'hooks').forEach(hook => hook(dispatch, getState));

    dispatch({ type: LOAD_COMPLETE });
  });

  return store;
}
