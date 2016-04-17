import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as userActions, service as userService } from 'modules/user';
import { actions as cardsActions } from 'modules/cards';

export const createSubscriptionAction = createAction(
  actionTypes.CREATE_SUBSCRIPTION,
  service.createSubscription
);

export const createSubscription = (plan, card, address) => async (dispatch, getState) => {
  try {
    const planId = `GOALS_${plan.toUpperCase()}`;
    const { user } = getState();

    // Create stripe customer
    await userService.createCustomer(user.id);

    // Create credit card
    await dispatch(cardsActions.createCard(user.id, card));

    // Create Subscription
    const { payload: subscription } = await dispatch(createSubscriptionAction(user.id, planId));

    // Update user with address
    await dispatch(userActions.updateUser(user.id, { address, subscription: subscription.id }));

    // Transition to dashboard
    dispatch(push('/projects'));
  } catch (error) {
    throw error;
  }
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
