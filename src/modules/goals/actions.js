import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { recordsByIdSelector } from './selectors';

export const create = createAction(actionTypes.CREATE, service.create);

export const update = createAction(actionTypes.UPDATE, service.update);

export const remove = createAction(actionTypes.REMOVE, service.remove);

export const fetchSingle = createAction(actionTypes.FETCH_SINGLE, service.fetchSingle);

export const fetchMany = createAction(actionTypes.FETCH_MANY, service.fetchMany);

export const toggle = id => async (dispatch, getState) => {
  const record = recordsByIdSelector(getState())[id];
  dispatch(update(id, { complete: !record.complete }));
};
