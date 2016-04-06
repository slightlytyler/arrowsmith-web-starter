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
  get: (resource, endpoint) => axios.get(buildApiUrl(resource, endpoint)),
  post: (resource, endpoint, payload) => axios.post(buildApiUrl(resource, endpoint), payload),
  authorize: payload => axios.post(buildAuthUrl(), payload),
};
