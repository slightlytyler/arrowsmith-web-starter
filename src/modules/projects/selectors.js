import { createSelector } from 'reselect';

export const projectsSelector = state => state.projects;

export const recordIdsSelector = createSelector(
  projectsSelector,
  projects => projects.recordIds,
);

export const recordsByIdSelector = createSelector(
  projectsSelector,
  projects => projects.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
