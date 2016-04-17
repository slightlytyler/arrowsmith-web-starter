import { createSelector } from 'reselect';

export const cardsSelector = state => state.subscriptions;

export const recordIdsSelector = createSelector(
  cardsSelector,
  cards => cards.recordIds
);

export const recordsByIdSelector = createSelector(
  cardsSelector,
  cards => cards.recordsById
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
