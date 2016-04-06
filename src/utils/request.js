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

import axios from 'axios';

export default {
  get: (resource, endpoint) => (
    axios.get(buildApiUrl(resource, endpoint), {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  post: (resource, endpoint, payload) => (
    axios.post(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  put: (resource, endpoint, payload) => (
    axios.put(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  patch: (resource, endpoint, payload) => (
    axios.patch(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  delete: (resource, endpoint) => (
    axios.delete(buildApiUrl(resource, endpoint), {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  authorize: payload => axios.post(buildAuthUrl('local/login'), payload),
  unauthorize: () => axios.get(buildAuthUrl('logout'), {
    headers: { 'x-stamplay-jwt': token },
  }),
};
