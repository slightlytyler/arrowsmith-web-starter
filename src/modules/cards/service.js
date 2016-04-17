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
