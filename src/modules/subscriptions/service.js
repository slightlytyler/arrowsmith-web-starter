import request from 'utils/request';
import { service as userService } from 'modules/user';
import { service as cardsService } from 'modules/cards';

export const create = async (userId, planId, card, address) => {
  await userService.createCustomer(userId);
  await cardsService.createCard(userId, card);

  const { data: subscription } = await request.post(
    'stripe',
    `customers/${userId}/subscriptions`,
    { planId }
  );

  await userService.updateUser(userId, { address, subscription: subscription.id });

  return subscription;
};

export const update = async (id, payload) => {
  const response = await request.patch('stripe', `subscriptions/${id}`, payload);
  return response.data;
};

export const remove = async id => {
  const response = await request.delete('stripe', `subscriptions/${id}`);
  return response.data;
};

export const fetchSingle = async (subscriptionId, userId) => {
  const response = await request.get(
    'stripe',
    `customers/${userId}/subscriptions/${subscriptionId}`
  );
  return response.data;
};

export const fetchMany = () => new Error(
  'Currently stamplay only allows for a single subscription, aborting fetchMany.'
);
