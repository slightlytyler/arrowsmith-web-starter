import { actionTypes } from './constants';
const { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } = actionTypes;
import { push as pushRoute } from 'react-router-redux';
import recordFromSnapshot from 'utils/recordFromSnapshot';

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
  const projectRef = firebase.child(`projects/${id}`);
  const projectGoalsRef = firebase
    .child(`goals`)
    .orderByChild('projectId')
    .equalTo(id)
    .ref()
  ;

  projectRef.remove().then(() => {
    if (active || projects.records.length === 1) {
      dispatch(pushRoute('/projects'));
    }
  });

  projectGoalsRef.remove();
};

export const viewProject = id => dispatch => dispatch(pushRoute(`/projects/${id}/goals/active`));

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
