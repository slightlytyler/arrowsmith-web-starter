import { createSelector, defaultMemoize as memoize } from 'reselect';
import { NAME, filters } from 'modules/goals/constants';

export const substateSelector = state => state[NAME];

export const recordIdsSelector = createSelector(
  substateSelector,
  goals => goals.recordIds,
);

export const recordsByIdSelector = createSelector(
  substateSelector,
  goals => goals.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, props) => props.id,
  (recordsById, id) => recordsById[id]
);

export const remainingRecordIdsDeriver = memoize((recordIds, recordsById) => (
  recordIds.filter(id => !recordsById[id].complete)
));

export const completedRecordIdsDeriver = memoize((recordIds, recordsById) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const filteredRecordIdsDeriver = memoize((recordIds, recordsById, activeFilter) => {
  switch (activeFilter) {
    case filters.REMAINING_FILTER:
      return remainingRecordIdsDeriver(recordIds, recordsById);

    case filters.COMPLETED_FILTER:
      return completedRecordIdsDeriver(recordIds, recordsById);

    case filters.ALL_FILTER:
    default:
      return recordIds;
  }
});

export const recordIdsByProjectIdDeriver = memoize((recordIds, recordsById, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
