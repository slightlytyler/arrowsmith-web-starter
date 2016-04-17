import request, { registerToken, unregisterToken } from 'utils/request';

export const createUser = async user => {
  const response = await request.post('user', 'users', user);
  return response.data;
};

export const updateUset = async () => new Promise;

export const deleteUser = async () => new Promise;

export const authorizeUser = async (email, password) => {
  const response = await request.authorize({ email, password });
  const user = response.data;
  user.token = response.headers['x-stamplay-jwt'];

  registerToken(user.token);

  return user;
};

export const unauthorizeUser = async () => {
  // await request.unauthorize();
  unregisterToken();
  return true;
};
