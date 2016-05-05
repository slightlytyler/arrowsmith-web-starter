import stripe from 'stripe';
import { mapKeys, snakeCase } from 'lodash';
import { client } from 'api';
import { NAME } from './constants';

const endpoint = userId => client.buildApiUrl('stripe', `customers/${userId}/${NAME}`);

export const createRecord = async (userId, card) => {
  const token = await new Promise((resolve, reject) =>
    stripe.card.createToken(
      mapKeys(card, (value, key) => snakeCase(key)
    ),
    (status, response) => {
      if (response.error) reject(response.error.message);
      else resolve(response.id);
    })
  );

  return client.createRecord(endpoint(userId), { token });
};

export const updateRecord = (userId, payload) => client.replaceRecord(endpoint(userId), payload);

export const fetchRecord = userId => client.fetchRecord(endpoint(userId));
