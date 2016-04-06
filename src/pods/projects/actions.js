import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_PROJECTS,
} from './constants';
import request from 'utils/request';
import { push as pushRoute } from 'react-router-redux';

export const viewProject = id => dispatch => (
  dispatch(pushRoute(`/projects/${id}/goals/active`))
);

export const fetchProjects = () => async (dispatch, getState) => {
  try {
    // Fetch projects
    const response = await request.get(
      'cobject',
      'projects/find/owner',
      getState().user.token,
    );

    // Add projects to store
    dispatch({
      type: SET_PROJECTS,
      payload: response.data.data,
    });
  } catch (error) {
    throw error;
  }
};

export const createProject = name => async (dispatch, getState) => {
  try {
    const response = await request.post(
      'cobject',
      'projects',
      getState().user.token,
      {
        name,
        owner: getState().user.id,
      },
    );

    dispatch({
      type: CREATE_PROJECT,
      payload: response.data,
    });

    dispatch(viewProject(response.data.id));
  } catch (error) {
    throw error;
  }
};

export const updateProject = (id, payload) => async (dispatch, getState) => {
  try {
    const response = await request.patch(
      'cobject',
      `projects/${id}`,
      getState().user.token,
      payload,
    );

    dispatch({
      type: UPDATE_PROJECT,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProject = id => async (dispatch, getState) => {
  try {
    await request.delete(
      'cobject',
      `projects/${id}`,
      getState().user.token,
    );

    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });

    dispatch(pushRoute('/projects'));
  } catch (error) {
    throw error;
  }
};
