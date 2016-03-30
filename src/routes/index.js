/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import ProjectsViewer from 'pods/projects/components/Viewer';
import GoalsViewer from 'pods/goals/components/Viewer';
import { ACTIVE_FILTER, COMPLETE_FILTER, ALL_FILTER } from 'pods/goal/model';

export default (store) => (
  <Route path="/">
    <IndexRedirect to="goals/active" />
    <Route path="projects" component={ProjectsViewer}>
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
