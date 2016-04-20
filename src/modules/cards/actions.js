import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);

const _fetch = createAction(actionTypes.FETCH, service.fetch);
export const fetch = () => (dispatch, getState) => (
  dispatch(_fetch(getState().user.id))
);
