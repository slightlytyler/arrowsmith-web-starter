import request from 'utils/request';

export const createSubscription = async (userId, planId) => {
  const response = await request.post('stripe', `customers/${userId}/subscriptions`, { planId });
  return response.data;
};

export const updateSubscription = async (id, payload) => {
  const response = await request.patch('stripe', `subscriptions/${id}`, payload);
  return response.data;
};

export const deleteSubscription = async id => {
  const response = await request.delete('stripe', `subscriptions/${id}`);
  return response.data;
};

export const fetchSubscription = async (subscriptionId, userId) => {
  const response = await request.get(
    'stripe',
    `customers/${userId}/subscriptions/${subscriptionId}`
  );
  return response.data;
};

export const createCustomer = userId => request.post('stripe', 'customers', { userId });

export const setUserAddress = (userId, address) => (
  request.put('user', `users/${userId}`, { address })
);
