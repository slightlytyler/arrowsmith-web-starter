/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import GoalsLayout from 'pods/goals/layout';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';

export default (store) => (
  <Route path="/">
    <IndexRedirect to="goals/active" />
    <Route path="goals">
      <Route path="active" component={GoalsLayout} filter={ACTIVE_FILTER} />
      <Route path="complete" component={GoalsLayout} filter={COMPLETE_FILTER} />
      <Route path="all" component={GoalsLayout} filter={ALL_FILTER} />
    </Route>
  </Route>
);
