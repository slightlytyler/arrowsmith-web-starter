import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import * as storage from 'redux-storage';
import { root as rootReducer } from 'reducers';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { LOCAL_STORAGE_KEY } from 'config';
import { registerToken } from 'utils/request';
import { CLEAR_STORE, LOAD_COMPLETE } from 'constants/actionTypes';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  actionTypes as userActionTypes,
  actions as userActions,
  middleware as userMiddleware,
} from 'modules/user';

const reducer = storage.reducer(rootReducer);

const engine = filter(
  createEngine(LOCAL_STORAGE_KEY),
  ['user'],
);

const storageMiddleware = storage.createMiddleware(
  engine,
  [LOCATION_CHANGE],
  [
    CLEAR_STORE,
    ...Object.values(userActionTypes),
  ],
);

const load = storage.createLoader(engine);

export default function configureStore(initialState = {}, routerMiddleware) {
  // Compose final middleware
  const middleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    routerMiddleware,
    storageMiddleware,
    userMiddleware.handleAuth
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

  load(store).then(() => {
    const { dispatch, getState } = store;
    const { user } = getState();

    if (user.id) {
      if (user.token) registerToken(user.token);
      dispatch(userActions.get());
    }

    dispatch({ type: LOAD_COMPLETE });
  });

  return store;
}
