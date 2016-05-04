import { client } from 'api';
import { NAME } from './constants';

const endpoint = client.buildResourceUrl(NAME);

export const createRecord = (projectId, text) => client.createRecord(endpoint, {
  projectId,
  text,
  complete: false,
});

export const updateRecord = (id, payload) => client.updateRecord(`${endpoint}/${id}`, payload);

export const replaceRecord = (id, payload) => client.replaceRecord(`${endpoint}/${id}`, payload);

export const deleteRecord = id => client.deleteRecord(`${endpoint}/${id}`);

export const fetchRecord = id => client.fetchRecord(`${endpoint}/${id}`);

export const fetchCollection = query => client.fetchCollection(`${endpoint}/find/owner`, query);
