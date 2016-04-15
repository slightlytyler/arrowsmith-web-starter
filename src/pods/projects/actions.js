import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { push as pushRoute } from 'react-router-redux';

export const viewProject = id => dispatch => (
  dispatch(pushRoute(`/projects/${id}/goals/active`))
);

export const createProject = createAction(actionTypes.CREATE_PROJECT, service.createProject);

export const updateProject = createAction(actionTypes.UPDATE_PROJECT, service.updateProject);

export const deleteProject = createAction(actionTypes.DELETE_PROJECT, service.deleteProject);

export const fetchProjects = createAction(actionTypes.FETCH_PROJECTS, service.fetchProjects);
