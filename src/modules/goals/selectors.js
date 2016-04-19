import { createSelector, defaultMemoize as memoize } from 'reselect';
import { filters } from 'modules/goals/constants';

export const goalsSelector = state => state.goals;

export const recordIdsSelector = createSelector(
  goalsSelector,
  goals => goals.recordIds,
);

export const recordsByIdSelector = createSelector(
  goalsSelector,
  goals => goals.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, props) => props.id,
  (recordsById, id) => recordsById[id]
);

export const getRemainingGoalIds = memoize((recordIds, recordsById) => (
  recordIds.filter(id => !recordsById[id].complete)
));

export const getCompletedGoalIds = memoize((recordIds, recordsById) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const getFilteredGoalIds = memoize((recordIds, recordsById, activeFilter) => {
  switch (activeFilter) {
    case filters.REMAINING_GOALS_FILTER:
      return getRemainingGoalIds(recordIds, recordsById);

    case filters.COMPLETED_GOALS_FILTER:
      return getCompletedGoalIds(recordIds, recordsById);

    case filters.ALL_GOALS_FILTER:
    default:
      return recordIds;
  }
});

export const getGoalIdsByProject = memoize((recordIds, recordsById, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
