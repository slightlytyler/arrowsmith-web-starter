import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const view = id => pushRoute(`/projects/${id}/goals/active`);
export const viewIndex = () => pushRoute('/projects');

const _create = createAction(actionTypes.CREATE, service.create);
export const create = (...args) => async dispatch => {
  const action = await dispatch(_create(...args));
  dispatch(view(action.payload.id));
};

export const update = createAction(actionTypes.UPDATE, service.update);

const _remove = createAction(actionTypes.REMOVE, service.remove);
export const remove = (...args) => async dispatch => {
  await dispatch(_remove(...args));
  dispatch(viewIndex());
};

export const get = createAction(actionTypes.GET, service.get);
export const fetch = createAction(actionTypes.FETCH, service.fetch);
