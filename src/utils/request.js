import path from 'path';
import { API_VERSION, STAMPLAY_APP_ID } from 'config';

const baseUrl = `https://${STAMPLAY_APP_ID}.stamplayapp.com`;
const apiBaseUrl = path.join(baseUrl, 'api');
const authBaseUrl = path.join(baseUrl, 'auth');

export const buildApiUrl = (resource, endpoint) => (
  path.join(apiBaseUrl, resource, API_VERSION, endpoint)
);
export const buildAuthUrl = () => path.join(authBaseUrl, API_VERSION, 'local/login');

import axios from 'axios';

export default {
  get: (resource, endpoint, token) => (
    axios.get(buildApiUrl(resource, endpoint), {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  post: (resource, endpoint, token, payload) => (
    axios.post(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  put: (resource, endpoint, token, payload) => (
    axios.put(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  patch: (resource, endpoint, token, payload) => (
    axios.patch(buildApiUrl(resource, endpoint), payload, {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  delete: (resource, endpoint, token) => (
    axios.delete(buildApiUrl(resource, endpoint), {
      headers: { 'x-stamplay-jwt': token },
    })
  ),
  authorize: payload => axios.post(buildAuthUrl(), payload),
};
