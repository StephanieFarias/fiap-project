import api, { fetcher } from './api';

export const Patient = {
  getAll: () => api.get('/api/paciente/todos', fetcher),
  getById: (id) => api.get(id ? `/api/paciente/${id}` : null, fetcher),
  create: (payload) => api.post(`/api/paciente`, payload),
  edit: (id, payload) => api.put(`/api/paciente/${id}`, payload),
  deactivate: (id) => api.delete(`/api/paciente/${id}`),
};
