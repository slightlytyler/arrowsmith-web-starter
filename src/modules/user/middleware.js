import client from 'api/client';
import { login, logout, signUp } from './actionTypes';
import { CLEAR_STORE } from 'store/actionTypes';
import { actions as routerActions } from 'modules/router';

export const handleAuth = store => next => action => {
  const result = next(action);
  const { type } = action;
  const { dispatch } = store;

  if (type === login.success || type === signUp.success) {
    client.registerToken(action.payload.token);
    dispatch(routerActions.pushRoute('/'));
  } else if (type === logout.success) {
    client.unregisterToken();
    dispatch(routerActions.pushRoute('/login'));
    dispatch({ type: CLEAR_STORE });
  }

  return result;
};
