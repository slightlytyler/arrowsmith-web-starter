/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import PageLayout from 'layouts/Page';
import Login from 'pods/auth/components/Login';
import SignUp from 'pods/auth/components/SignUp';
import Editor from 'components/Editor';
import GoalsViewer from 'pods/goals/components/Viewer';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';

export default (store) => (
  <Route path="/" component={PageLayout}>
    <IndexRedirect to="goals/active" />
    <Route path="auth">
      <Route path="login" component={Login} />
      <Route path="sign-up" component={SignUp} />
    </Route>
    <Route path="projects" component={Editor}>
      <Route path=":projectId">
        <Route path="goals">
          <Route path="active" component={GoalsViewer} filter={ACTIVE_FILTER} />
          <Route path="complete" component={GoalsViewer} filter={COMPLETE_FILTER} />
          <Route path="all" component={GoalsViewer} filter={ALL_FILTER} />
        </Route>
      </Route>
    </Route>
  </Route>
);
