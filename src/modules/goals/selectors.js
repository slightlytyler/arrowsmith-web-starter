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

export const getRemainingRecordIds = memoize((recordIds, recordsById) => (
  recordIds.filter(id => !recordsById[id].complete)
));

export const getCompletedRecordIds = memoize((recordIds, recordsById) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const getFilteredRecordIds = memoize((recordIds, recordsById, activeFilter) => {
  switch (activeFilter) {
    case filters.REMAINING_FILTER:
      return getRemainingRecordIds(recordIds, recordsById);

    case filters.COMPLETED_FILTER:
      return getCompletedRecordIds(recordIds, recordsById);

    case filters.ALL_FILTER:
    default:
      return recordIds;
  }
});

export const getRecordIdsByProjectId = memoize((recordIds, recordsById, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
