import { createSelector } from 'reselect';

export const substateSelector = state => state.subscriptions;

export const recordsByIdSelector = createSelector(
  substateSelector,
  subscriptions => subscriptions.recordsById,
);

export const recordIdsSelector = createSelector(
  recordsByIdSelector,
  recordsById => Object.keys(recordsById)
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
