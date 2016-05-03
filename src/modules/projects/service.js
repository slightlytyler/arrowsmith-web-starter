import { stringify } from 'querystring';
import { buildResourceUrl } from 'utils/request';
import { NAME } from './constants';

const endpoint = buildResourceUrl(NAME);

export const createRecord = name => ({
  method: 'POST',
  endpoint,
  body: { name },
});

export const updateRecord = (id, payload) => ({
  method: 'PATCH',
  endpoint: `${endpoint}/${id}`,
  body: payload,
});

export const replaceRecord = (id, payload) => ({
  method: 'PUT',
  endpoint: `${endpoint}/${id}`,
  body: payload,
});

export const deleteRecord = id => ({
  method: 'DELETE',
  endpoint: `${endpoint}/${id}`,
});

export const fetchRecord = id => ({
  method: 'GET',
  endpoint: `${endpoint}/${id}}`,
});

export const fetchCollection = query => ({
  method: 'GET',
  endpoint: `${endpoint}/find/owner?${stringify(query)}`,
});
