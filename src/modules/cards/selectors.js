import { createSelector } from 'reselect';
import { createAllRecordIdsSelector } from 'api/helpers';
import { NAME } from './constants';

export const getSubState = state => state[NAME];

export const getRecordsById = createSelector(
  getSubState,
  cards => cards.recordsById
);

export const getAllRecordsById = createAllRecordIdsSelector(getRecordsById);
