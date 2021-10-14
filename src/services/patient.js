import api, { fetcher } from './api';

export const Patient = {
  getAll: () => api.get('/paciente/todos', fetcher),
  getById: (id) => api.get(id ? `/paciente/${id}` : null, fetcher),
  create: (payload) => api.post(`/paciente`, payload),
  edit: (id, payload) => api.put(`/paciente/${id}`, payload),
  deactivate: (id) => api.delete(`/paciente/${id}`),
};
