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
