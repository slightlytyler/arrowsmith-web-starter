import request from 'utils/request';

export const create = async payload => {
  const response = await request.post('cobject', 'projects', payload);
  return response.data;
};

export const update = async (id, payload) => {
  const response = await request.patch('cobject', `projects/${id}`, payload);
  return response.data;
};

export const remove = async id => {
  const response = await request.delete('cobject', `projects/${id}`);
  return response.data;
};

export const fetchSingle = async id => {
  const response = await request.get('cobject', `projects/${id}`);
  return response.data;
};

export const fetchMany = async () => {
  const response = await request.get('cobject', 'projects/find/owner');
  return response.data.data;
};
