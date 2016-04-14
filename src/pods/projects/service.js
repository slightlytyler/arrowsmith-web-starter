import request from 'utils/request';

export const fetchProjects = async () => {
  const response = await request.get('cobject', 'projects/find/owner');
  return response.data.data;
};

export const createProject = async name => {
  const response = await request.post('cobject', 'projects', { name });
  return response.data;
};

export const updateProject = async (id, payload) => {
  const response = await request.patch('cobject', `projects/${id}`, payload);
  return response.data;
};

export const deleteProject = async id => {
  const response = await request.delete('cobject', `projects/${id}`);
  return response.data;
};
