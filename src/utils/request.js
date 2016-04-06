import path from 'path';
import { API_VERSION, STAMPLAY_APP_ID } from 'config';
const baseUrl = `https://${STAMPLAY_APP_ID}.stamplayapp.com`;
const apiUrl = path.join(baseUrl, 'api');
const authUrl = path.join(baseUrl, 'auth');

export const buildApiUrl = (resource, endpoint) => (
  path.join(apiUrl, resource, API_VERSION, endpoint)
);

export const buildAuthUrl = () => path.join(authUrl, API_VERSION, 'local/login');

import axios from 'axios';
export default {
  post: (resource, endpoint, payload) => axios.post(buildApiUrl(resource, endpoint), payload),
  authorize: payload => axios.post(buildAuthUrl(), payload),
};
