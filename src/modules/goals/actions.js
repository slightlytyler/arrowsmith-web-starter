import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { recordsByIdSelector } from './selectors';

export const createGoal = createAction(actionTypes.CREATE_GOAL, service.createGoal);

export const updateGoal = createAction(actionTypes.UPDATE_GOAL, service.updateGoal);

export const deleteGoal = createAction(actionTypes.DELETE_GOAL, service.deleteGoal);

export const fetchGoals = createAction(actionTypes.FETCH_GOALS, service.fetchGoals);

export const toggleGoal = id => async (dispatch, getState) => {
  const record = recordsByIdSelector(getState())[id];
  dispatch(updateGoal(id, { complete: !record.complete }));
};
