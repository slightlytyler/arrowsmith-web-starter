import { push as pushRoute } from 'react-router-redux';
import { createApiAction } from 'api/helpers';
import * as actionTypes from './actionTypes';
import * as service from './service';
import {
  actions as userActions,
  service as userService,
  selectors as userSelectors,
} from 'modules/user';
import { actions as cardActions } from 'modules/cards';

// xport const create = async (userId, planId, card, address) => {
//  await userService.createCustomer(userId);
//  await cardsService.createRecord(userId, card);

//  const { data: subscription } = await request.post(
//    'stripe',
//    `customers/${userId}/subscriptions`,
//    { planId }
//  );

//  await userService.update(userId, { address, subscriptionId: subscription.id });

//  return subscription;
// ;

export const createRecord = (plan, card, address) => async (dispatch, getState) => {
  const planId = `GOALS_${plan.toUpperCase()}`;
  const userId = userSelectors.getId(getState());

  await userService.createCustomer(userId);

  await dispatch(cardActions.createRecord(userId, card));

  const subscription = await dispatch(
    createApiAction(
      actionTypes.api.createRecord,
      service.createRecord
    )(userId, planId)
  );

  await dispatch(userActions.update(userId, { address, subscriptionId: subscription.payload.id }));

  dispatch(pushRoute('/projects'));
};

export const updateRecord = (id, payload) => createApiAction(
  actionTypes.api.updateRecord,
  service.updateRecord
)(id, payload);

export const deleteRecord = id => createApiAction(
  actionTypes.api.deleteRecord,
  service.deleteRecord
)(id);

export const fetchRecord = () => (dispatch, getState) => {
  const state = getState();

  return dispatch(
    createApiAction(
      actionTypes.api.fetchRecord,
      service.fetchRecord
    )(userSelectors.getId(state), userSelectors.getSubscriptionId(state))
  );
};
