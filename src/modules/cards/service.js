import stripe from 'stripe';
import { mapKeys, snakeCase } from 'lodash';
import request from 'utils/request';

export const createCard = async (userId, card) => {
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

export const updateCard = async () => new Promise;

export const deleteCard = async () => new Promise;

export const fetchCard = async (userId) => {
  const response = await request.get(
    'stripe',
    `customers/${userId}/cards`
  );
  return response.data;
};
