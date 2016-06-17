import * as actionTypes from './actionTypes';

export const fetchRecord = () => ({
  type: actionTypes.fetchRecord.pending,
});

fetchRecord.success = record => ({
  type: actionTypes.fetchRecord.success,
  payload: record,
});

fetchRecord.failure = error => ({
  type: actionTypes.fetchRecord.failure,
  payload: { error },
});

export const login = credentials => ({
  type: actionTypes.login.pending,
  payload: credentials,
});

login.success = record => ({
  type: actionTypes.login.success,
  payload: record,
});

login.failure = error => ({
  type: actionTypes.login.failure,
  payload: { error },
});

export const logout = () => ({
  type: actionTypes.logout.pending,
});

logout.success = () => ({
  type: actionTypes.logout.success,
});

logout.failure = error => ({
  type: actionTypes.logout.failure,
  payload: { error },
});

export const signUp = attrs => ({
  type: actionTypes.signUp.pending,
  payload: attrs,
});

signUp.success = record => ({
  type: actionTypes.signUp.success,
  payload: record,
});

signUp.failure = error => ({
  type: actionTypes.signUp.failure,
  payload: { error },
});
