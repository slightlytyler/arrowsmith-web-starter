import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);

const _get = createAction(actionTypes.GET, service.get);
export const get = () => (dispatch, getState) => dispatch(_get(getState().user.id));
