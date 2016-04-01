export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

export const setCurrentUser = auth => ({
  type: SET_CURRENT_USER,
  auth,
});

export const clearCurrentUser = () => ({ type: CLEAR_CURRENT_USER });

export const createUser = (email, password, resolve, reject) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.createUser({ email, password }, (error, user) => {
    if (error) reject(error);
    else resolve(user);
  });
};

export const saveUser = (payload, resolve, reject) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child('users').child(payload.id).set(payload, error => {
    if (error) reject(error);
    else resolve();
  });
};

export const authorizeUser = (email, password, resolve, reject) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.authWithPassword({ email, password }, (error, auth) => {
    if (error) reject(error);
    else {
      // Set redux auth object
      dispatch(setCurrentUser(auth));

      resolve(auth);
    }
  });
};

export const unauthorizeUser = (resolve, reject) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.unauth();
  dispatch(clearCurrentUser());
  resolve();
};


import { createProject } from 'pods/project/model';

export const getUsersFirstProjectId = (resolve, reject) => async (dispatch, getState) => {
  const { firebase, auth } = getState();

  firebase
    .child('projects')
    .orderByChild('userId')
    .equalTo(auth.uid)
    .once('child_added', snapshot =>
      resolve(snapshot.key())
    )
  ;
};

export const initializeUser = (resolve, reject) => (dispatch, getState) => {
  const { firebase, auth } = getState();

  firebase
    .child('projects')
    .orderByChild('userId')
    .equalTo(auth.uid)
    .once('child_added', snapshot =>
      resolve(snapshot.key())
    )
  ;

  dispatch(createProject('Awesome Project'));
};

import { push } from 'react-router-redux';

export const userSignUpFlow = (email, password, payload) => async dispatch => {
  try {
    // Create firebase user
    const userData = await new Promise((resolve, reject) => {
      dispatch(createUser(email, password, resolve, reject));
    });

    // Save user to db
    const userRecord = { id: userData.uid, email, ...payload };
    await new Promise((resolve, reject) =>
      dispatch(saveUser(userRecord, resolve, reject))
    );

    // Login user
    await new Promise((resolve, reject) =>
      dispatch(authorizeUser(email, password, resolve, reject))
    );

    // Initialize state for user
    const initialProjectId = await new Promise((resolve, reject) =>
      dispatch(initializeUser(resolve, reject))
    );

    // Transition to editor route
    dispatch(push(`/projects/${initialProjectId}/goals/active`));
  } catch (error) {
    console.log(error);
  }
};

export const userLoginFlow = (email, password) => async dispatch => {
  try {
    // Authroize user
    await new Promise((resolve, reject) =>
      dispatch(authorizeUser(email, password, resolve, reject))
    );

    // Get id of first project
    const projectId = await new Promise((resolve, reject) =>
      dispatch(getUsersFirstProjectId(resolve, reject))
    );

    // Transition to first project
    dispatch(push(`/projects/${projectId}/goals/active`));
  } catch (error) {
    console.log(error);
  }
};

export const userLogoutFlow = () => async dispatch => {
  try {
    await new Promise((resolve, reject) =>
      dispatch(unauthorizeUser(resolve, reject))
    );

    dispatch(push('/auth/login'));
  } catch (error) {
    console.log(error);
  }
};

export const reducer = (state = {}, { type, auth }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return auth;
    case CLEAR_CURRENT_USER:
      return {};

    default:
      return state;
  }
};
