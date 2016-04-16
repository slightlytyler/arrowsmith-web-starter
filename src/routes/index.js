/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import Page from 'components/Page';
import Landing from 'modules/landing/components/Layout';
import Login from 'modules/user/components/Login';
import SignUp from 'modules/user/components/SignUp';
import SelectPlan from 'modules/subscriptions/components/SelectPlan';
import Checkout from 'modules/subscriptions/components/Checkout';
import Editor from 'components/Editor';
import GoalsRoot from 'modules/goals/components/Root';
import {
  ACTIVE_GOALS_FILTER,
  COMPLETE_GOALS_FILTER,
  ALL_GOALS_FILTER,
} from 'modules/goals/constants';
import UserDashboard from 'modules/user/components/Dashboard';
import UserDashboardBilling from 'modules/user/components/Dashboard/Billing';

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
    <Route path="dashboard" component={UserDashboard}>
      <Route path="user" />
      <Route path="billing" component={UserDashboardBilling} />
    </Route>
  </Route>
);
