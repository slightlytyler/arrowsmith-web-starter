import { createSelector } from 'reselect';

export const substateSelector = state => state.cards;

export const recordIdsSelector = createSelector(
  substateSelector,
  cards => cards.recordIds
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  cards => cards.recordsById
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
