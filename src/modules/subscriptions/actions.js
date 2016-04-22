import { createAction } from 'redux-actions';
import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as userActions } from 'modules/user';

const _create = createAction(actionTypes.CREATE, service.create);
export const create = (plan, card, address) => async (dispatch, getState) => {
  const planId = `GOALS_${plan.toUpperCase()}`;
  const { user } = getState();

  await dispatch(_create(user.id, planId, card, address));
  await dispatch(userActions.fetch());
  dispatch(pushRoute('/projects'));
};

export const update = createAction(actionTypes.UPDATE, service.update);
export const remove = createAction(actionTypes.REMOVE, service.remove);

const _get = createAction(actionTypes.GET, service.get);
export const get = subscriptionId => (dispatch, getState) => (
  dispatch(_get(subscriptionId, getState().user.id))
);

export const fetch = createAction(actionTypes.FETCH, service.fetch);
