import request from 'utils/request';
import {
  CREATE_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
  SET_GOALS,
} from 'pods/goals/constants';
import { findRecord } from 'pods/goals/selectors';

export const fetchGoals = projectId => async dispatch => {
  try {
    // Fetch projects
    const response = await request.get('cobject', 'goals/find/owner', {
      projectId,
    });

    // Add projects to store
    dispatch({
      type: SET_GOALS,
      payload: response.data.data,
    });
  } catch (error) {
    throw error;
  }
};

export const createGoal = (text, projectId) => async (dispatch, getState) => {
  try {
    const response = await request.post('cobject', 'goals', {
      text,
      complete: false,
      projectId,
      owner: getState().user.id,
    });

    dispatch({
      type: CREATE_GOAL,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const updateGoal = (id, payload) => async dispatch => {
  try {
    const response = await request.patch('cobject', `goals/${id}`, payload);

    dispatch({
      type: UPDATE_GOAL,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteGoal = id => async dispatch => {
  try {
    await request.delete('cobject', `goals/${id}`);

    dispatch({
      type: DELETE_GOAL,
      payload: { id },
    });
  } catch (error) {
    throw error;
  }
};

export const toggleGoal = id => async (dispatch, getState) => {
  const record = findRecord(getState(), id);

  dispatch(updateGoal(id, { complete: !record.complete }));
};
