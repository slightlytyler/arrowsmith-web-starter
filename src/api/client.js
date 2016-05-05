import { stringify } from 'querystring';

export { buildApiUrl, buildResourceUrl } from 'utils/request';

export const createRecord = (endpoint, body) => ({
  method: 'POST',
  endpoint,
  body,
});

export const updateRecord = (endpoint, body) => ({
  method: 'PATCH',
  endpoint,
  body,
});

export const replaceRecord = (endpoint, body) => ({
  method: 'PUT',
  endpoint,
  body,
});

export const deleteRecord = endpoint => ({
  method: 'DELETE',
  endpoint,
});

export const fetchRecord = endpoint => ({
  method: 'GET',
  endpoint,
});

export const fetchCollection = (endpoint, query) => ({
  method: 'GET',
  endpoint: query ? `${endpoint}?${stringify(query)}` : endpoint,
});
