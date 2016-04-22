import { get as getUser } from './actions';
import { request } from 'utils';

export const registerToken = (dispatch, getState) => {
  const { user } = getState();

  if (user.id) {
    if (user.token) request.registerToken(user.token);
    dispatch(getUser());
  }
};
