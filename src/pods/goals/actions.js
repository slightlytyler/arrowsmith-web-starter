import recordFromSnapshot from 'utils/recordFromSnapshot';
import { CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from 'pods/goals/constants';
import { findRecord } from 'pods/goals/selectors';

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

export const createGoalsSubscription = (projectId, queryParams) => (dispatch, getState) => {
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
