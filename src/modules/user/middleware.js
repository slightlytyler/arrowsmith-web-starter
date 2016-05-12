import { CLEAR_STORE } from 'constants/actionTypes';
import { authorize, unauthorize } from './actionTypes';
import { push as pushRoute } from 'react-router-redux';

export const handleAuth = store => next => action => {
  const result = next(action);
  const { type } = action;
  const { dispatch } = store;

  if (type === authorize.success) {
    dispatch(pushRoute('/projects'));
  } else if (type === unauthorize.success) {
    dispatch(pushRoute('/auth/login'));
    dispatch({ type: CLEAR_STORE });
  }

  return result;
};
