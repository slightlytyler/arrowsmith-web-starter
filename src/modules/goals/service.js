import request, { deserialize } from 'utils/request';

export const create = async (projectId, { text }) => {
  const response = await request.post('cobject', 'goals', {
    text,
    projectId,
    complete: false,
  });
  return deserialize(response.data);
};

export const update = async (id, payload) => {
  const response = await request.patch('cobject', `goals/${id}`, payload);
  return deserialize(response.data);
};

export const remove = async id => {
  const response = await request.delete('cobject', `goals/${id}`);
  return deserialize(response.data);
};

export const fetchSingle = async id => {
  const response = await request.get('cobject', `goals/${id}`);
  return deserialize(response.data);
};

export const fetchMany = async projectId => {
  const response = await request.get('cobject', 'goals/find/owner', { projectId });
  return deserialize(response.data.data);
};
