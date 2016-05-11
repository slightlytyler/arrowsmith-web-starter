import { fetchRecord } from './actions';
import { getId, getToken } from './selectors';
import { request } from 'utils';

export const registerToken = (dispatch, getState) => {
  const state = getState();
  const id = getId(state);

  if (id) {
    const token = getToken(state);
    if (token) request.registerToken(token);
    dispatch(fetchRecord());
  }
};
