import { createSelector } from 'reselect';
import {
  createFindCollectionSelector,
  createFindCurrentCollectionSelector,
  createFindRecordSelector,
  createFindRecordsSelector,
  createIsLoadingSelector,
} from 'helpers/selectors';
import NAME from './NAME';

export const getSubstate = state => state[NAME];

export const getCollections = createSelector(
  getSubstate,
  substate => substate.collections
);

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById,
);

export const getCurrentQuery = createSelector(
  getSubstate,
  substate => substate.currentQuery
);

export const findCollection = createFindCollectionSelector(getCollections);

export const findCurrentCollection = createFindCurrentCollectionSelector(
  findCollection,
  getCurrentQuery
);

export const findRecord = createFindRecordSelector(getRecordsById);

export const findRecords = createFindRecordsSelector(getRecordsById);

export const isLoading = createIsLoadingSelector(findCollection, findCurrentCollection);
