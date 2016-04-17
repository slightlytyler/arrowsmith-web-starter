/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import Page from 'components/Page';
import Landing from 'modules/landing/components/Layout';
import { SignUp, Login } from 'modules/user/components';
import { SelectPlan, Checkout } from 'modules/subscriptions/components';
import Editor from 'components/Editor';
import { Root as GoalsRoot } from 'modules/goals';
import {
  ACTIVE_GOALS_FILTER,
  COMPLETE_GOALS_FILTER,
  ALL_GOALS_FILTER,
} from 'modules/goals/constants';
import { Dashboard, Billing } from 'modules/user/components';

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
          <Route path="active" component={GoalsRoot} filter={ACTIVE_GOALS_FILTER} />
          <Route path="complete" component={GoalsRoot} filter={COMPLETE_GOALS_FILTER} />
          <Route path="all" component={GoalsRoot} filter={ALL_GOALS_FILTER} />
        </Route>
      </Route>
    </Route>
    <Redirect from="start-subscription" to="start-subscription/select-plan" />
    <Route path="start-subscription">
      <Route path="select-plan" component={SelectPlan} />
      <Route path="checkout" component={Checkout}/>
    </Route>
    <Route path="dashboard" component={Dashboard}>
      <Route path="user" />
      <Route path="billing" component={Billing} />
    </Route>
  </Route>
);
