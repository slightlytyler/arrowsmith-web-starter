// Constants
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';


// Selectors
import { createSelector } from 'reselect';

export const projectsSelector = state => state.projects;
export const recordsSelector = createSelector(
  projectsSelector,
  projects => projects.records,
);
export const recordsByIdSelector = createSelector(
  projectsSelector,
  projects => projects.recordsById,
);

export const findRecord = createSelector(
  recordsByIdSelector,
  (state, id) => id,
  (recordsById, id) => recordsById[id],
);

// Actions
import recordFromSnapshot from 'utils/recordFromSnapshot';

export const registerProjectListeners = () => (dispatch, getState) => {
  const { firebase } = getState();
  const ref = firebase.child(`projects`);

  ref.on('child_added', snapshot => dispatch({
    type: CREATE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  }));

  ref.on('child_changed', snapshot => dispatch({
    type: UPDATE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  }));

  ref.on('child_removed', snapshot => dispatch({
    type: DELETE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  }));
};

export const createProject = name => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`projects`).push({ name });
};

export const updateProject = (id, payload) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`projects/${id}`).update(payload);
};


export const deleteProject = id => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`projects/${id}`).remove();
};

// Reducers
import { combineReducers } from 'redux';
import updateIn, { push, assoc, dissoc, merge } from 'react-update-in';

const records = (state = [], action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return push([action.payload.id], state);

    case DELETE_PROJECT:
      return dissoc(state, state.indexOf(action.payload.id));

    default:
      return state;
  }
};

const recordsById = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return assoc(state, action.payload.id, action.payload);

    case UPDATE_PROJECT:
      return updateIn(state, [action.payload.id], merge, action.payload);

    case DELETE_PROJECT:
      return dissoc(state, action.payload.id);

    default:
      return state;
  }
};

export const reducer = combineReducers({
  records,
  recordsById,
});
