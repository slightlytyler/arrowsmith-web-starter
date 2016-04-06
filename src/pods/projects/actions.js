import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './constants';
import request from 'utils/request'
import { push as pushRoute } from 'react-router-redux';

export const createProject = name => dispatch => {

};

export const updateProject = (id, payload) =>  dispatch => {

};

export const deleteProject = id => dispatch => {

};

export const viewProject = id => dispatch => dispatch(pushRoute(`/projects/${id}/goals/active`));


export const fetchProjects = () => async dispatch => {
  const response = await request.get('cobject', 'goals');
};
