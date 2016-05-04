import { createSelector, defaultMemoize as memoize } from 'reselect';
import { isEqual } from 'lodash';
import { NAME, filters } from './constants';

export const substateSelector = state => state[NAME];

export const collectionsSelector = createSelector(
  substateSelector,
  substate => substate.collections
);

export const findCollection = createSelector(
  collectionsSelector,
  (state, query) => query,
  (collections, query) => collections.find(c => isEqual(c.query, query))
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  substate => substate.recordsById
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
  (recordsById, id) => recordsById[id]
);

export const getRemainingCollectionIds = memoize((recordsById, collectionIds) => (
  collectionIds.filter(id => !recordsById[id].complete)
));

export const getCompletedCollectionIds = memoize((recordsById, recordIds) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const getFilteredCollectionIds = createSelector(
  recordsByIdSelector,
  (state, collectionIds) => collectionIds,
  (state, collectionIds, activeFilter) => activeFilter,
  (recordsById, collectionIds, activeFilter) => {
    switch (activeFilter) {
      case filters.REMAINING_FILTER:
        return getRemainingCollectionIds(recordsById, collectionIds);

      case filters.COMPLETED_FILTER:
        return getCompletedCollectionIds(recordsById, collectionIds);

      case filters.ALL_FILTER:
      default:
        return collectionIds;
    }
  }
);

export const recordIdsByProjectIdDeriver = memoize((recordIds, recordsById, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
