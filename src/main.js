import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import makeRoutes from 'routes';
import Root from 'containers/Root';
import configureStore from 'store';
import { FIREBASE_APP_NAME } from 'config';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});
const store = configureStore({
  firebase: new Firebase(`https://${FIREBASE_APP_NAME}.firebaseio.com/`),
}, routerMiddleware(browserHistory));
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
