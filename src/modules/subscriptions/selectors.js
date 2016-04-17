import { createSelector } from 'reselect';

export const subscriptionsSelector = state => state.subscriptions;

export const recordIdsSelector = createSelector(
  subscriptionsSelector,
  subscriptions => subscriptions.recordIds,
);

export const recordsByIdSelector = createSelector(
  subscriptionsSelector,
  subscriptions => subscriptions.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
