import { createSelector, defaultMemoize as memoize } from 'reselect';
import {
  createFindCollectionSelector,
  createAllRecordIdsSelector,
  createFindRecordSelector,
} from 'api/helpers';
import { NAME, filters } from './constants';

export const getSubstate = state => state[NAME];

export const getCollections = createSelector(
  getSubstate,
  substate => substate.collections
);

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById,
);

export const findCollection = createFindCollectionSelector(getCollections);

export const findRecord = createFindRecordSelector(getRecordsById);

export const getAllRecordIds = createAllRecordIdsSelector(getRecordsById);

export const getRemainingCollectionIds = memoize((recordsById, collectionIds) => (
  collectionIds.filter(id => !recordsById[id].complete)
));

export const getCompletedCollectionIds = memoize((recordsById, recordIds) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const getFilteredCollectionIds = createSelector(
  getRecordsById,
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

export const getRecordIdsByProject = memoize((recordsById, recordIds, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
