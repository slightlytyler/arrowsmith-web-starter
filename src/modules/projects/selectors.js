import { createSelector } from 'reselect';

export const projectsSelector = state => state.projects;

export const recordsSelector = createSelector(
  projectsSelector,
  projects => projects.records,
);

export const recordIdsSelector = recordsSelector;

export const recordsByIdSelector = createSelector(
  projectsSelector,
  projects => projects.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
