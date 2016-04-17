import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const createUser = createAction(
  actionTypes.CREATE_USER,
  service.createUser
);

export const updateUser = () => undefined;

export const deleteUser = () => undefined;

export const authorizeUser = createAction(
  actionTypes.AUTHORIZE_USER,
  service.authorizeUser
);

export const unauthorizeUser = createAction(
  actionTypes.UNAUTHORIZE_USER,
  service.unauthorizeUser
);

export const userLoginFlow = (email, password) => async dispatch => {
  try {
    await dispatch(authorizeUser(email, password));
    dispatch(pushRoute(`/projects`));
  } catch (error) {
    throw error;
  }
};

export const userLogoutFlow = () => async dispatch => {
  try {
    await dispatch(unauthorizeUser());
    dispatch(pushRoute('/auth/login'));
  } catch (error) {
    throw error;
  }
};

export const userSignUpFlow = payload => async dispatch => {
  try {
    await dispatch(createUser(payload));
    await dispatch(userLoginFlow(payload.email, payload.password));
    dispatch(pushRoute(`/projects`));
  } catch (error) {
    throw error;
  }
};
