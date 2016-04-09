/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Page from 'components/Page';
import Landing from 'pods/landing/components/Layout';
import Login from 'pods/user/components/Login';
import SignUp from 'pods/user/components/SignUp';
import SelectPlan from 'pods/subscriptions/components/SelectPlan';
import Editor from 'components/Editor';
import GoalsViewer from 'pods/goals/components/Viewer';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';

export default (store) => (
  <Route path="/" component={Page}>
    <IndexRoute component={Landing} />
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
    <Route path="start-subscription">
      <Route path="select-plan" component={SelectPlan} />
      <Route path="checkout" />
    </Route>
  </Route>
);
