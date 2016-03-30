export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const setCurrentUser = auth => ({
  type: SET_CURRENT_USER,
  auth,
});

export const createUser = (payload, cb) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.child('users').child(payload.id).set(payload, error => {
    if (!error) {
      cb();
    }
  });
};

export const loginUser = (email, password, cb) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.authWithPassword({ email, password }, (error, auth) => {
    if (!error) {
      cb(auth);
    }
  });
};

export const signUpUser = (email, password, userData, cb) => (dispatch, getState) => {
  const { firebase } = getState();

  firebase.createUser({ email, password }, (error, user) => {
    if (!error) {
      dispatch(createUser({ id: user.uid, email, ...userData }, () =>
        dispatch(loginUser(email, password, auth => {
          dispatch(setCurrentUser(auth));
          if (cb) cb();
        }))
      ));
    }
  });
};

export const reducer = (state = {}, { type, auth }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return auth;

    default:
      return state;
  }
};
