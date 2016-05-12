import { createSelector } from 'reselect';
import {
  createAllRecordIdsSelector,
  createFindRecordSelector,
} from 'api/helpers';
import { NAME } from './constants';

export const getSubstate = state => state[NAME];

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById
);

export const findRecord = createFindRecordSelector(getRecordsById);

export const getAllRecordIds = createAllRecordIdsSelector(getRecordsById);
