import { createSelector } from 'reselect';

export const substateSelector = state => state.subscriptions;

export const recordIdsSelector = createSelector(
  substateSelector,
  subscriptions => subscriptions.recordIds,
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  subscriptions => subscriptions.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
