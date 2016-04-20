import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);
export const remove = createAction(actionTypes.DELETE, service.delete);
export const fetch = createAction(actionTypes.FETCH, service.fetch);
export const authorize = createAction(actionTypes.AUTHORIZE, service.authorize);
export const unauthorize = createAction(actionTypes.UNAUTHORIZE, service.unauthorize);

export const login = (email, password) => async dispatch => {
  await dispatch(authorize(email, password));
  dispatch(pushRoute(`/projects`));
};

export const logout = () => async dispatch => {
  await dispatch(unauthorize());
  dispatch(pushRoute('/auth/login'));
};

export const signUp = payload => async dispatch => {
  await dispatch(create(payload));
  await dispatch(login(payload.email, payload.password));
  dispatch(pushRoute(`/projects`));
};
