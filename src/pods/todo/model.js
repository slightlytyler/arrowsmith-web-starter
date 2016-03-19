// Constants
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Selectors
import { createSelector } from 'reselect';

export const todosSelector = state => state.todos;
export const recordsSelector = createSelector(
  todosSelector,
  todos => todos.records,
);
export const recordsByIdSelector = createSelector(
  todosSelector,
  todos => todos.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);

export const remainingTodos = createSelector(
  recordsSelector,
  recordsByIdSelector,
  (records, recordsById) => records.filter(id => !recordsById[id].complete),
);

// Actions
import generateId from 'shortid';

export const createTodo = text => ({
  type: CREATE_TODO,
  payload: {
    id: generateId(),
    text,
    complete: false,
  },
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
import update from 'react-addons-update';

const records = (state = [], action) => {
  switch (action.type) {
    case CREATE_TODO:
      return [...state, action.payload.id];

    default:
      return state;
  }
};

const recordsById = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        [action.payload.id]: { ...action.payload },
      };

    case UPDATE_TODO:
      return update(state, {
        [action.id]: {
          $merge: action.payload,
        },
      });

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
