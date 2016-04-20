import { createSelector } from 'reselect';

export const substateSelector = state => state.projects;

export const recordIdsSelector = createSelector(
  substateSelector,
  projects => projects.recordIds,
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  projects => projects.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
