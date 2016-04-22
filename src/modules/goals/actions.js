import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { recordsByIdSelector } from './selectors';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);
export const destroy = createAction(actionTypes.DESTROY, service.destroy);
export const get = createAction(actionTypes.GET, service.get);
export const fetch = createAction(actionTypes.FETCH, service.fetch);

export const toggle = id => async (dispatch, getState) => {
  const record = recordsByIdSelector(getState())[id];
  dispatch(update(id, { complete: !record.complete }));
};
