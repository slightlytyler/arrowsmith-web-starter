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
import { push as pushRoute } from 'react-router-redux';

export const createProject = name => (dispatch, getState) => {
  const { firebase, auth } = getState();

  firebase.child(`projects`).push({
    name,
    goals: [],
    userId: auth.uid,
  }).then(snapshot => dispatch(pushRoute(`/projects/${snapshot.key()}/goals/active`)));
};

export const updateProject = (id, payload) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child(`projects/${id}`).update(payload);
};

export const deleteProject = (id, active) => (dispatch, getState) => {
  const { firebase, projects } = getState();

  firebase.child(`projects/${id}`).remove().then(() => {
    if (active || projects.records.length === 1) {
      dispatch(pushRoute('/projects'))
    }
  });
};

import recordFromSnapshot from 'utils/recordFromSnapshot';

export const createProjectsSubscription = () => (dispatch, getState) => {
  const { firebase, auth } = getState();
  const ref = firebase
    .child(`projects`)
    .orderByChild('userId')
    .equalTo(auth.uid)
  ;

  const childAddedHandler = snapshot => dispatch({
    type: CREATE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  });
  const childUpdatedHandler = snapshot => dispatch({
    type: UPDATE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  });
  const childRemovedHandler = snapshot => dispatch({
    type: DELETE_PROJECT,
    payload: recordFromSnapshot(snapshot),
  });

  return {
    subscribeProjects: () => {
      ref.on('child_added', childAddedHandler);
      ref.on('child_changed', childUpdatedHandler);
      ref.on('child_removed', childRemovedHandler);
    },
    unsubscribeProjects: () => {
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
    case CREATE_PROJECT: {
      const id = action.payload.id;
      const index = state.indexOf(id);
      if (index === -1) {
        return push([action.payload.id], state);
      }
      return assoc(state, index, id);
    }
    case DELETE_PROJECT:
      return dissoc(state, state.indexOf(action.payload.id));

    case CLEAR_CURRENT_USER:
      return [];

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
