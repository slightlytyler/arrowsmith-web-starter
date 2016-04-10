import request, { registerToken, unregisterToken } from 'utils/request';
import { push as pushRoute } from 'react-router-redux';
import { SET_USER, CLEAR_USER } from './constants';

const setUser = user => ({
  type: SET_USER,
  user,
});

const clearUser = () => ({
  type: CLEAR_USER,
});

const createUser = user => request.post(
  'user',
  'users',
  user,
);

const authorizeUser = (email, password) => request.authorize({ email, password });

const unauthorizeUser = () => request.unauthorize(); // eslint-disable-line no-unused-vars

export const userSignUpFlow = payload => async dispatch => {
  try {
    // Create firebase user
    await createUser(payload);

    // Login user
    const response = await authorizeUser(payload.email, payload.password);
    const user = response.data;
    user.token = response.headers['x-stamplay-jwt'];

    // Register token
    registerToken(user.token);

    // Persist user
    dispatch(setUser(user));

    // Transition to projects
    dispatch(pushRoute('/projects'));
  } catch (error) {
    throw error;
  }
};

export const userLoginFlow = (email, password) => async dispatch => {
  try {
    // Login user
    const response = await authorizeUser(email, password);
    const user = response.data;
    user.token = response.headers['x-stamplay-jwt'];

    // Register token
    registerToken(user.token);

    // Persist user
    dispatch(setUser(user));

    // Transition to first project
    dispatch(pushRoute(`/projects`));
  } catch (error) {
    throw error;
  }
};

export const userLogoutFlow = () => dispatch => {
  try {
    // Unregister toke
    unregisterToken();

    // Clear user from local data
    dispatch(clearUser());

    // Transition to login page
    dispatch(pushRoute('/auth/login'));
  } catch (error) {
    throw error;
  }
};
