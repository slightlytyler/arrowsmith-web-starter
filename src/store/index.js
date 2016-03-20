import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import rootReducer from 'reducers';

const reducer = storage.reducer(rootReducer);

import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
const engine = filter(
  createEngine('arrowsmith-web-starter'),
  ['goals'],
);

const storageMiddleware = storage.createMiddleware(engine, [
  '@@router/LOCATION_CHANGE',
]);

const load = storage.createLoader(engine);

export default function configureStore(initialState = {}, routerMiddleware) {
  // Compose final middleware and use devtools in debug environment
  const middleware = applyMiddleware(
    thunk,
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

  load(store);

  return store;
}
