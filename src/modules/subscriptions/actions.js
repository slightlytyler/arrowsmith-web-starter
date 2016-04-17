import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as cardsActions } from 'modules/cards';

const fetchSubscriptionAction = createAction(
  actionTypes.FETCH_SUBSCRIPTION,
  service.fetchSubscription
);

export const createSubscription = createAction(
  actionTypes.CREATE_SUBSCRIPTION,
  service.createSubscription
);

export const fetchSubscription = subscriptionId => (dispatch, getState) => (
  dispatch(fetchSubscriptionAction(subscriptionId, getState().user.id))
);

export const createSubscriptionFlow = (plan, card, address) => async (dispatch, getState) => {
  try {
    const planId = `GOALS_${plan.toUpperCase()}`;
    const { user } = getState();

    // Create stripe customer
    await service.createCustomer(user.id);

    // Update user with address
    await service.setUserAddress(user.id, address);

    // Create credit card
    await dispatch(cardsActions.createCard(user.id, card));

    // Create Subscription
    await dispatch(createSubscription(user.id, planId));

    // Transition to dashboard
    dispatch(push('/projects'));
  } catch (error) {
    throw error;
  }
};
