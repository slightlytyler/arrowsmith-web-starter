import { client } from 'api';
import { NAME } from './constants';

const endpoint = userId => client.buildApiUrl('stripe', `customers/${userId}/${NAME}`);

export const createRecord = (userId, token) => client.createRecord(endpoint(userId), { token });

export const updateRecord = (userId, token) => client.replaceRecord(endpoint(userId), { token });

export const fetchRecord = userId => client.fetchRecord(endpoint(userId));
