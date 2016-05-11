import request from 'utils/request';
import { service as userService } from 'modules/user';
import { service as cardsService } from 'modules/cards';

export const createRecord = async (userId, planId, card, address) => {
  await userService.createCustomer(userId);
  await cardsService.createRecord(userId, card);

  const { data: subscription } = await request.post(
    'stripe',
    `customers/${userId}/subscriptions`,
    { planId }
  );

  await userService.update(userId, { address, subscriptionId: subscription.id });

  return subscription;
};

export const updateRecord = async (id, payload) => {
  const response = await request.patch('stripe', `subscriptions/${id}`, payload);
  return response.data;
};

export const deleteRecord = async id => {
  const response = await request.delete('stripe', `subscriptions/${id}`);
  return response.data;
};

export const fetchRecord = async (subscriptionId, userId) => {
  const response = await request.get(
    'stripe',
    `customers/${userId}/subscriptions/${subscriptionId}`
  );
  return response.data;
};
