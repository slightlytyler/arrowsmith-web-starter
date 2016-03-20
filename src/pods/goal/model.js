// Constants
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const ACTIVE_FILTER = 'active';
export const COMPLETE_FILTER = 'complete';
export const ALL_FILTER = 'all';

// Selectors
import { createSelector } from 'reselect';

export const todosSelector = state => state.goals;
export const recordsSelector = createSelector(
  todosSelector,
  goals => goals.records,
);
export const recordsByIdSelector = createSelector(
  todosSelector,
  goals => goals.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);

export const remainingTodosSelector = createSelector(
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
import generateId from 'shortid';

export const createTodo = text => {
  const id = generateId();

  return {
    type: CREATE_TODO,
    id,
    payload: {
      id,
      text,
      complete: false,
    },
  };
};

export const updateTodo = (id, payload) => ({
  type: UPDATE_TODO,
  id,
  payload,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const toggleTodo = id => (dispatch, getState) => {
  const record = findRecord(getState(), id);

  dispatch({
    type: UPDATE_TODO,
    id,
    payload: { complete: !record.complete },
  });
};

// Reducers
import { combineReducers } from 'redux';
import updateIn, { push, assoc, dissoc, merge } from 'react-update-in';

const records = (state = [], action) => {
  switch (action.type) {
    case CREATE_TODO:
      return push(state, [action.payload.id]);

    case DELETE_TODO:
      return dissoc(state, state.indexOf(action.id));

    default:
      return state;
  }
};

const recordsById = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return assoc(state, action.id, action.payload);

    case UPDATE_TODO:
      return updateIn(state, [action.id], merge, action.payload);

    case DELETE_TODO:
      return dissoc(state, action.id);

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
