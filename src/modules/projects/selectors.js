import { createSelector } from 'reselect';
import { isEqual } from 'lodash';
import { NAME } from './constants';

export const substateSelector = state => state[NAME];

export const collectionsSelector = createSelector(
  substateSelector,
  substate => substate.collections
);

export const findCollection = createSelector(
  collectionsSelector,
  (state, query) => query,
  (collections, query) => collections.find(c => isEqual(c.query, query)),
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  substate => substate.recordsById,
);

export const allRecordIdsSelector = createSelector(
  recordsByIdSelector,
  recordsById => Object.keys(recordsById)
);

export const allRecordsSelector = createSelector(
  recordsByIdSelector,
  recordsById => Object.values(recordsById)
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);
