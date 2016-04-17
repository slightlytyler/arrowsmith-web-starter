import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const createUser = createAction(
  actionTypes.CREATE_USER,
  service.createUser
);

export const updateUser = createAction(
  actionTypes.UPDATE_USER,
  service.updateUser
);

export const deleteUser = createAction(
  actionTypes.DELETE_USER,
  service.deleteUser
);

export const fetchUser = createAction(
  actionTypes.FETCH_USER,
  service.fetchUser
);

export const authorizeUser = createAction(
  actionTypes.AUTHORIZE_USER,
  service.authorizeUser
);

export const unauthorizeUser = createAction(
  actionTypes.UNAUTHORIZE_USER,
  service.unauthorizeUser
);

export const loginUser = (email, password) => async dispatch => {
  try {
    await dispatch(authorizeUser(email, password));
    dispatch(pushRoute(`/projects`));
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await dispatch(unauthorizeUser());
    dispatch(pushRoute('/auth/login'));
  } catch (error) {
    throw error;
  }
};

export const signupUser = payload => async dispatch => {
  try {
    await dispatch(createUser(payload));
    await dispatch(loginUser(payload.email, payload.password));
    dispatch(pushRoute(`/projects`));
  } catch (error) {
    throw error;
  }
};
