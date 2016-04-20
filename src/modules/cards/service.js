import stripe from 'stripe';
import { mapKeys, snakeCase } from 'lodash';
import request from 'utils/request';

export const create = async (userId, card) => {
  const token = await new Promise((resolve, reject) =>
    stripe.card.createToken(
      mapKeys(card,
      (value, key) => snakeCase(key)
    ),
    (status, response) => {
      if (response.error) reject(response.error.message);
      else resolve(response.id);
    })
  );

  return request.post('stripe', `customers/${userId}/cards`, { token });
};

export const update = async (userId, payload) => {
  const response = await request.put('stripe', `customers/${userId}/cards`, payload);
  return response.data;
};

export const fetch = async userId => {
  const response = await request.get(
    'stripe',
    `customers/${userId}/cards`
  );
  return response.data;
};
