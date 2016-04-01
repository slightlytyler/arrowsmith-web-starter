// Constants
export const CREATE_GOAL = 'CREATE_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const DELETE_GOAL = 'DELETE_GOAL';

export const ACTIVE_FILTER = 'active';
export const COMPLETE_FILTER = 'complete';
export const ALL_FILTER = 'all';

// Selectors
import { createSelector } from 'reselect';

export const goalsSelector = state => state.goals;
export const recordsSelector = createSelector(
  goalsSelector,
  goals => goals.records,
);
export const recordsByIdSelector = createSelector(
  goalsSelector,
  goals => goals.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);

export const remainingGoalsSelector = createSelector(
  recordsSelector,
  recordsByIdSelector,
  (records, recordsById) => records.filter(id => !recordsById[id].complete),
);

export const activeFilterSelector = containerProps => containerProps.route.filter;

export const projectGoalsSelector = createSelector(
  recordsSelector,
  recordsByIdSelector,
  (state, projectId) => projectId,
  (records, recordsById, projectId) => records.filter(id => recordsById[id].projectId === projectId)
);

export const filteredProjectGoalsSelector = createSelector(
  projectGoalsSelector,
  recordsByIdSelector,
  (state, projectId, activeFilter) => activeFilter,
  (records, recordsById, activeFilter) => {
    switch (activeFilter) {
      case ACTIVE_FILTER:
        return records.filter(id => !recordsById[id].complete);

      case COMPLETE_FILTER:
        return records.filter(id => recordsById[id].complete);

      case ALL_FILTER:
      default:
        return records;
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
  const ref = firebase
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
      ref.on('child_added', childAddedHandler);
      ref.on('child_changed', childUpdatedHandler);
      ref.on('child_removed', childRemovedHandler);
    },
    unsubscribeGoals: () => {
      ref.off('child_added', childAddedHandler);
      ref.off('child_changed', childUpdatedHandler);
      ref.off('child_removed', childRemovedHandler);
    },
  };
};

// Reducers
import { combineReducers } from 'redux';
import updateIn, { push, assoc, dissoc, merge } from 'react-update-in';
import { CLEAR_CURRENT_USER } from 'pods/auth/model';

const records = (state = [], action) => {
  switch (action.type) {
    case CREATE_GOAL: {
      const id = action.payload.id;
      const index = state.indexOf(id);
      if (index === -1) {
        return push([action.payload.id], state);
      }
      return assoc(state, index, id);
    }

    case DELETE_GOAL:
      return dissoc(state, state.indexOf(action.payload.id));

    case CLEAR_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

const recordsById = (state = {}, action) => {
  switch (action.type) {
    case CREATE_GOAL:
      return assoc(state, action.payload.id, action.payload);

    case UPDATE_GOAL:
      return updateIn(state, [action.payload.id], merge, action.payload);

    case DELETE_GOAL:
      return dissoc(state, action.payload.id);

    case CLEAR_CURRENT_USER:
      return {};

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
