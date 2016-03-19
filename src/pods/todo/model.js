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

// Reducers
import { combineReducers } from 'redux';

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

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
