import { push as pushRoute } from 'react-router-redux';
import { CLEAR_STORE } from 'constants/actionTypes';
import { AUTHORIZE, UNAUTHORIZE } from './actionTypes';

export const handleAuth = store => next => action => {
  const result = next(action);
  const { type } = action;
  const { dispatch } = store;

  if (type === AUTHORIZE) {
    dispatch(pushRoute('/projects'));
  } else if (type === UNAUTHORIZE) {
    dispatch(pushRoute('/auth/login'));
    dispatch({ type: CLEAR_STORE });
  }

  return result;
};
