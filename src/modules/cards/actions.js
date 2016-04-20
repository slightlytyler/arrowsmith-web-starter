import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const create = createAction(actionTypes.CREATE, service.create);
export const update = createAction(actionTypes.UPDATE, service.update);

const _fetchSingle = createAction(actionTypes.FETCH_SINGLE, service.fetchSingle);
export const fetchSingle = () => (dispatch, getState) => (
  dispatch(_fetchSingle(getState().user.id))
);
