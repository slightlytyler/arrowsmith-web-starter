/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Page from 'components/Page';
import Login from 'pods/user/components/Login';
import SignUp from 'pods/user/components/SignUp';
import Editor from 'components/Editor';
import GoalsViewer from 'pods/goals/components/Viewer';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';

export default (store) => (
  <Route path="/" component={Page}>
    <IndexRedirect to="goals/active" />
    <Route path="auth">
      <Route path="login" component={Login} />
      <Route path="sign-up" component={SignUp} />
    </Route>
    <Route path="projects" component={Editor}>
      <Route path=":projectId">
        <Route path="goals">
          <Route path="active" component={GoalsViewer} filter={ACTIVE_GOALS_FILTER} />
          <Route path="complete" component={GoalsViewer} filter={COMPLETE_GOALS_FILTER} />
          <Route path="all" component={GoalsViewer} filter={ALL_GOALS_FILTER} />
        </Route>
      </Route>
    </Route>
  </Route>
);
