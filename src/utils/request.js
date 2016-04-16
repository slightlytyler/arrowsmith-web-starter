import path from 'path';
import { API_VERSION, STAMPLAY_APP_ID } from 'config';

let token;
export const registerToken = (newToken) => token = newToken;
export const unregisterToken = () => token = undefined;

const baseUrl = `https://${STAMPLAY_APP_ID}.stamplayapp.com`;
const apiBaseUrl = path.join(baseUrl, 'api');
const authBaseUrl = path.join(baseUrl, 'auth');

export const buildApiUrl = (resource, endpoint) => (
  path.join(apiBaseUrl, resource, API_VERSION, endpoint)
);
export const buildAuthUrl = endpoint => path.join(authBaseUrl, API_VERSION, endpoint);

const buildHeaders = (headers = {}) => {
  if (token) {
    return { 'x-stamplay-jwt': token, ...headers };
  }

  return headers;
};

import axios from 'axios';

export default {
  get: (resource, endpoint, queryParams) => axios.get(buildApiUrl(resource, endpoint), {
    headers: buildHeaders(),
    params: queryParams,
  }),
  post: (resource, endpoint, payload) => (
    axios.post(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  put: (resource, endpoint, payload) => (
    axios.put(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  patch: (resource, endpoint, payload) => (
    axios.patch(buildApiUrl(resource, endpoint), payload, {
      headers: buildHeaders(),
    })
  ),
  delete: (resource, endpoint) => (
    axios.delete(buildApiUrl(resource, endpoint), {
      headers: buildHeaders(),
    })
  ),
  authorize: payload => axios.post(buildAuthUrl('local/login'), payload),
  unauthorize: () => axios.get(buildAuthUrl('logout'), {
    headers: buildHeaders(),
  }),
};

import { mapValues } from 'lodash';

export const isRecordId = key => key !== 'id' && key !== '_id' && key.substr(-2) === 'Id';

const deserializeRecord = record => mapValues(record, (value, key) => {
  if (isRecordId(key) && Array.isArray(value)) return value[0];
  return value;
});

export const deserialize = payload => {
  if (Array.isArray(payload)) return payload.map(deserializeRecord);
  return deserializeRecord(payload);
};
