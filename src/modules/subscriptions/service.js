import { client } from 'api';
import { NAME } from './constants';

const endpoint = userId => client.buildApiUrl('stripe', `customers/${userId}/${NAME}`);

export const createRecord = (userId, planId) => client.createRecord(endpoint(userId), { planId });

export const updateRecord = (userId, id, payload) => (
  client.replaceRecord(`${endpoint(userId)}/${id}`, payload)
);

export const deleteRecord = (userId, id) => client.deleteRecord(`${endpoint(userId)}/${id}`);

export const fetchRecord = (userId, id) => client.fetchRecord(`${endpoint(userId)}/${id}`);
