export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const setUser = user => ({
  type: SET_USER,
  user,
});

const clearUser = () => ({
  type: CLEAR_USER,
});

import request from 'utils/request';


const createUser = (email, password) => request.post(
  'user',
  'users',
  { email, password },
);

const authorizeUser = (email, password) => request.authorize({ email, password });

const unauthorizeUser = clearUser;

import { push } from 'react-router-redux';

export const userSignUpFlow = (email, password, payload) => async dispatch => {
  try {
    // Create firebase user
    await createUser(email, password);

    // Login user
    const response = await authorizeUser(email, password);
    const user = response.data;
    user.token = response.headers['x-stamplay-jwt'];

    // Persist user
    dispatch(setUser(user));

    // Transition to projects
    dispatch(push('/projects'));
  } catch (error) {
    console.log(error);
  }
};

export const userLoginFlow = (email, password) => async dispatch => {
  try {
    // Login user
    const response = await authorizeUser(email, password);
    const user = response.data;
    user.token = response.headers['x-stamplay-jwt'];

    // Persist user
    dispatch(setUser(user));

    // Transition to first project
    dispatch(push(`/projects`));
  } catch (error) {
    console.log(error);
  }
};

export const userLogoutFlow = () => dispatch => {
  try {
    // Logout user
    dispatch(unauthorizeUser());

    // Transition to login page
    dispatch(push('/auth/login'));
  } catch (error) {
    console.log(error);
  }
};

export const reducer = (state = {}, { type, user }) => {
  switch (type) {
    case SET_USER:
      return user;

    case CLEAR_USER:
      return {};

    default:
      return state;
  }
};
