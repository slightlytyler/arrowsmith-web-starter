import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const view = id => dispatch => dispatch(pushRoute(`/projects/${id}/goals/active`));

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);
export const remove = createAction(actionTypes.REMOVE, service.remove);
export const fetchSingle = createAction(actionTypes.FETCH_SINGLE, service.fetchSingle);
export const fetchMany = createAction(actionTypes.FETCH_MANY, service.fetchMany);
