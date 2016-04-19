import request, { deserialize } from 'utils/request';

export const createGoal = async (projectId, { text }) => {
  const response = await request.post('cobject', 'goals', {
    text,
    projectId,
    complete: false,
  });
  return deserialize(response.data);
};

export const updateGoal = async (id, payload) => {
  const response = await request.patch('cobject', `goals/${id}`, payload);
  return deserialize(response.data);
};

export const deleteGoal = async id => {
  const response = await request.delete('cobject', `goals/${id}`);
  return deserialize(response.data);
};

export const fetchGoals = async projectId => {
  const response = await request.get('cobject', 'goals/find/owner', { projectId });
  return deserialize(response.data.data);
};
