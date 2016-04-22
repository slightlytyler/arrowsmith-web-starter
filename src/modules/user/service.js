import request, { registerToken, unregisterToken } from 'utils/request';

export const create = async payload => {
  const response = await request.post('user', 'users', payload);
  return response.data;
};

export const update = async (id, payload) => {
  const response = await request.put('user', `users/${id}`, payload);
  return response.data;
};

export const remove = async id => {
  const response = await request.delete('user', `users/${id}`);
  return response.data;
};

export const get = async () => {
  const response = await request.get('user', 'getstatus');
  return response.data.user;
};

export const authorize = async (email, password) => {
  const response = await request.authorize({ email, password });
  const user = response.data;
  user.token = response.headers['x-stamplay-jwt'];

  registerToken(user.token);

  return user;
};

export const unauthorize = async () => {
  // stamplay forces redirect after unauthorize,
  // waiting on api changes
  // await request.unauthorize();
  unregisterToken();
  return true;
};

export const createCustomer = async userId => {
  const response = await request.post('stripe', 'customers', { userId });
  return response.data;
};
