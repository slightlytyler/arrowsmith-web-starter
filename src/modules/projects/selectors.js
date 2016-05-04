import { createSelector } from 'reselect';
import {
  createFindCollectionSelector,
  createAllRecordIdsSelector,
  createFindRecordSelector,
} from 'api/helpers';
import { NAME } from './constants';

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
