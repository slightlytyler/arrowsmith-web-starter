import { createAction } from 'redux-actions';

import * as actionTypes from './actionTypes';
import * as service from './service';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);
export const remove = createAction(actionTypes.DELETE, service.delete);
export const get = createAction(actionTypes.GET, service.get);
export const authorize = createAction(actionTypes.AUTHORIZE, service.authorize);
export const unauthorize = createAction(actionTypes.UNAUTHORIZE, service.unauthorize);

export const login = authorize;
export const logout = unauthorize;
export const signUp = payload => async dispatch => {
  await dispatch(create(payload));
  await dispatch(login(payload.email, payload.password));
};
