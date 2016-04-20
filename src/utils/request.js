// JWT Handling
let token;
export const registerToken = newToken => token = newToken;
export const unregisterToken = () => token = undefined;

// HTTP Request config
import path from 'path';
import axios from 'axios';
import { API_VERSION, STAMPLAY_APP_ID } from 'config';

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

export const request = {
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

// Request helpers
export const createRecord = async (endpoint, payload) => {
  const response = await request.post('cobject', endpoint, payload);
  return response.data;
};

export const updateRecord = async (endpoint, id, payload) => {
  const response = await request.patch('cobject', `${endpoint}/${id}`, payload);
  return response.data;
};

export const removeRecord = async (endpoint, id) => {
  const response = await request.delete('cobject', `${endpoint}/${id}`);
  return response.data;
};

export const fetchRecord = async (endpoint, id) => {
  const response = await request.get('cobject', `${endpoint}/${id}`);
  return response.data;
};

export const fetchRecords = async endpoint => {
  const response = await request.get('cobject', `${endpoint}/find/owner`);
  return response.data.data;
};

export const helpers = {
  createRecord,
  updateRecord,
  removeRecord,
  fetchRecord,
  fetchRecords,
};

export default { ...request, ...helpers };

// Serializing / Deserializing
import { mapValues } from 'lodash';

export const isRelationshipId = key => key !== 'id' && key !== '_id' && key.substr(-2) === 'Id';

const deserializeRecord = record => mapValues(record, (value, key) => {
  if (isRelationshipId(key) && Array.isArray(value)) return value[0];
  return value;
});

export const deserialize = payload => {
  if (Array.isArray(payload)) return payload.map(deserializeRecord);
  return deserializeRecord(payload);
};
