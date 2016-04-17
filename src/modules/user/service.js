import request, { registerToken, unregisterToken } from 'utils/request';

export const createUser = async payload => {
  const response = await request.post('user', 'users', payload);
  return response.data;
};

export const updateUser = async (userId, payload) => {
  const response = await request.put('user', `users/${userId}`, payload);
  return response.data;
};

export const deleteUser = async userId => {
  const response = await request.delete('user', `users/${userId}`);
  return response.data;
};

export const fetchUser = async () => {
  const response = await request.get('user', 'getstatus');
  return response.data.user;
};

export const authorizeUser = async (email, password) => {
  const response = await request.authorize({ email, password });
  const user = response.data;
  user.token = response.headers['x-stamplay-jwt'];

  registerToken(user.token);

  return user;
};

export const unauthorizeUser = async () => {
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
