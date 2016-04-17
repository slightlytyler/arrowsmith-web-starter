import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import * as storage from 'redux-storage';
import rootReducer from 'reducers';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { LOCAL_STORAGE_KEY } from 'config';
import { registerToken } from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes as userActionTypes } from 'modules/user';

const reducer = storage.reducer(rootReducer);

const engine = filter(
  createEngine(LOCAL_STORAGE_KEY),
  ['user'],
);

const storageMiddleware = storage.createMiddleware(
  engine,
  [LOCATION_CHANGE],
  [userActionTypes.CREATE_USER, userActionTypes.AUTHORIZE_USER, userActionTypes.UNAUTHORIZE_USER],
);

const load = storage.createLoader(engine);

export default function configureStore(initialState = {}, routerMiddleware) {
  // Compose final middleware and use devtools in debug environment
  const middleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    routerMiddleware,
    storageMiddleware,
  );

  // Create final store and subscribe router in debug env ie. for devtools
  const store = compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  load(store).then(loadedState => {
    const { token } = loadedState.user;
    if (token) registerToken(token);
    store.dispatch({ type: 'LOAD_COMPLETE' });
  });

  return store;
}
