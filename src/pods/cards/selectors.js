import { createSelector } from 'reselect';
import { map } from 'lodash';
import createRecordsById from 'utils/createRecordsById';

export const cardsSelector = state => state.subscriptions;

export const recordsSelector = createSelector(
  cardsSelector,
  cards => cards.records,
);

export const recordIdsSelector = createSelector(
  recordsSelector,
  records => map(records, record => record.id),
);

export const recordsByIdSelector = createSelector(
  recordsSelector,
  records => createRecordsById(records),
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
