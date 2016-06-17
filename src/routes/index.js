/* eslint-disable react/prop-types */
/* eslint no-unused-vars: [2, { "argsIgnorePattern": "dispatch|getState" }] */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import { Page } from 'components';
import { Login, SignUp } from 'modules/user/components';
import {
  Root as AppointmentsRoot,
  Creator as AppointmentsCreator,
  Editor as AppointmentsEditor,
  Viewer as AppointmentsViewer,
} from 'modules/appointments/components';

export default ({ dispatch, getState }) => {
  const authenticateRoute = (nextState, replace) => {
    const state = getState();

    if (!state.user.token) {
      replace({ pathname: '/login' });
    }
  };

  return (
    <Route path="/" component={Page}>
      <IndexRedirect to="appointments" />
      <Route path="login" component={Login} />
      <Route path="sign-up" component={SignUp} />
      <Route path="appointments" onEnter={authenticateRoute}>
        <IndexRoute component={AppointmentsRoot} />
        <Route path="new" component={AppointmentsCreator} />
        <Route path=":id">
          <IndexRoute component={AppointmentsViewer} />
          <Route path="edit" component={AppointmentsEditor} />
        </Route>
      </Route>
    </Route>
  );
};

