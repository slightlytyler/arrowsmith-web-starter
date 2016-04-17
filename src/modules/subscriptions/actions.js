import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as userActions } from 'modules/user';

export const createSubscriptionAction = createAction(
  actionTypes.CREATE_SUBSCRIPTION,
  service.createSubscription
);

export const createSubscription = (plan, card, address) => async (dispatch, getState) => {
  const planId = `GOALS_${plan.toUpperCase()}`;
  const { user } = getState();

  await dispatch(createSubscriptionAction(user.id, planId, card, address));
  await dispatch(userActions.fetchUser());
  dispatch(push('/projects'));
};

export const updateSubscription = () => undefined;

export const deleteSubscription = () => undefined;

const fetchSubscriptionAction = createAction(
  actionTypes.FETCH_SUBSCRIPTION,
  service.fetchSubscription
);

export const fetchSubscription = subscriptionId => (dispatch, getState) => (
  dispatch(fetchSubscriptionAction(subscriptionId, getState().user.id))
);
