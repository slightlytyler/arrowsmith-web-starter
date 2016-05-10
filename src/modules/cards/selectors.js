import { createSelector } from 'reselect';
import { NAME } from './constants';

export const substateSelector = state => state[NAME];

export const recordsByIdSelector = createSelector(
  substateSelector,
  substate => substate.recordsById
);

export const recordIdsSelector = createSelector(
  recordsByIdSelector,
  recordsById => Object.keys(recordsById)
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id]
);
