// Constants
export const CREATE_GOAL = 'CREATE_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const DELETE_GOAL = 'DELETE_GOAL';

export const ACTIVE_FILTER = 'active';
export const COMPLETE_FILTER = 'complete';
export const ALL_FILTER = 'all';

// Selectors
import { createSelector } from 'reselect';
import { findIndex, map, filter } from 'lodash';
import createRecordsById from 'utils/createRecordsById';

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
      case ACTIVE_FILTER:
        return remainingGoalIds;

      case COMPLETE_FILTER:
        return completedGoalIds;

      case ALL_FILTER:
      default:
        return allGoalIds;
    }
  },
);

// Actions
export const createGoal = (text, projectId) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`goals`).push({
    text,
    complete: false,
    projectId,
  });
};

export const updateGoal = (id, payload) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`goals/${id}`).update(payload);
};


export const deleteGoal = id => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`goals/${id}`).remove();
};

export const toggleGoal = id => (dispatch, getState) => {
  const record = findRecord(getState(), id);

  dispatch(updateGoal(id, { complete: !record.complete }));
};

import recordFromSnapshot from 'utils/recordFromSnapshot';

export const createGoalsSubscription = projectId => (dispatch, getState) => {
  const { firebase } = getState();
  const query = firebase
    .child(`goals`)
    .orderByChild('projectId')
    .equalTo(projectId)
  ;

  const childAddedHandler = snapshot => dispatch({
    type: CREATE_GOAL,
    payload: recordFromSnapshot(snapshot),
  });
  const childUpdatedHandler = snapshot => dispatch({
    type: UPDATE_GOAL,
    payload: recordFromSnapshot(snapshot),
  });
  const childRemovedHandler = snapshot => dispatch({
    type: DELETE_GOAL,
    payload: recordFromSnapshot(snapshot),
  });

  return {
    subscribeGoals: () => {
      query.on('child_added', childAddedHandler);
      query.on('child_changed', childUpdatedHandler);
      query.on('child_removed', childRemovedHandler);
    },
    unsubscribeGoals: () => {
      query.off('child_added', childAddedHandler);
      query.off('child_changed', childUpdatedHandler);
      query.off('child_removed', childRemovedHandler);
    },
  };
};

// Reducers
import { combineReducers } from 'redux';
import { push, assoc, dissoc } from 'react-update-in';
import { CLEAR_CURRENT_USER } from 'pods/auth/model';

const records = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      if (index === -1) {
        return push(state, [payload]);
      }
      return assoc(state, index, payload);
    }

    case UPDATE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      return assoc(state, index, payload);
    }

    case DELETE_GOAL: {
      const index = findIndex(state, record => record.id === payload.id);
      return dissoc(state, index);
    }

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
});
