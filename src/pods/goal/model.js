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
export const filteredRecordsSelector = createSelector(
  recordsSelector,
  recordsByIdSelector,
  (state, activeFilter) => activeFilter,
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
import recordFromSnapshot from 'utils/recordFromSnapshot';

export const registerGoalListeners = () => (dispatch, getState) => {
  const { firebase } = getState();
  const ref = firebase.child(`goals`);

  ref.on('child_added', snapshot => dispatch({
    type: CREATE_GOAL,
    payload: recordFromSnapshot(snapshot),
  }));

  ref.on('child_changed', snapshot => dispatch({
    type: UPDATE_GOAL,
    payload: recordFromSnapshot(snapshot),
  }));

  ref.on('child_removed', snapshot => dispatch({
    type: DELETE_GOAL,
    payload: recordFromSnapshot(snapshot),
  }));
};

export const createGoal = text => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`goals`).push({
    text,
    complete: false,
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

// Reducers
import { combineReducers } from 'redux';
import updateIn, { push, assoc, dissoc, merge } from 'react-update-in';

const records = (state = [], action) => {
  switch (action.type) {
    case CREATE_GOAL:
      return push([action.payload.id], state);

    case DELETE_GOAL:
      return dissoc(state, state.indexOf(action.payload.id));

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

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
