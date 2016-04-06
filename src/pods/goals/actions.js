import { CREATE_GOAL, UPDATE_GOAL, DELETE_GOAL } from 'pods/goals/constants';
import { findRecord } from 'pods/goals/selectors';

export const createGoal = (text, projectId) => dispatch => {

};

export const updateGoal = (id, payload) => dispatch => {

};


export const deleteGoal = id => dispatch => {

};

export const toggleGoal = id => dispatch => {
  const record = findRecord(getState(), id);

  dispatch(updateGoal(id, { complete: !record.complete }));
};
