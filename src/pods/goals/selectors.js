import { createSelector } from 'reselect';
import { map, filter } from 'lodash';
import createRecordsById from 'utils/createRecordsById';
import { ACTIVE_GOALS_FILTER, COMPLETE_GOALS_FILTER, ALL_GOALS_FILTER } from 'pods/goals/constants';

export const goalsSelector = state => state.goals;

export const recordsSelector = createSelector(
  goalsSelector,
  goals => goals.records,
);

export const recordIdsSelector = createSelector(
  recordsSelector,
  records => map(records, record => record.id),
);

export const recordsByIdSelector = createSelector(
  recordsSelector,
  records => createRecordsById(records),
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);

export const projectGoalIdsSelector = createSelector(
  recordIdsSelector,
  recordsByIdSelector,
  (state, projectId) => projectId,
  (recordIds, recordsById, projectId) => (
    filter(recordIds, id => recordsById[id].projectId === projectId),
  ),
);

export const remainingGoalIdsSelector = createSelector(
  projectGoalIdsSelector,
  recordsByIdSelector,
  (recordIds, recordsById) => filter(recordIds, id => !recordsById[id].complete),
);

export const completedGoalIdsSelector = createSelector(
  projectGoalIdsSelector,
  recordsByIdSelector,
  (recordIds, recordsById) => filter(recordIds, id => recordsById[id].complete),
);

export const activeFilterSelector = containerProps => containerProps.route.filter;

export const filteredProjectGoalsSelector = createSelector(
  remainingGoalIdsSelector,
  completedGoalIdsSelector,
  projectGoalIdsSelector,
  (state, projectId, activeFilter) => activeFilter,
  (remainingGoalIds, completedGoalIds, allGoalIds, activeFilter) => {
    switch (activeFilter) {
      case ACTIVE_GOALS_FILTER:
        return remainingGoalIds;

      case COMPLETE_GOALS_FILTER:
        return completedGoalIds;

      case ALL_GOALS_FILTER:
      default:
        return allGoalIds;
    }
  },
);