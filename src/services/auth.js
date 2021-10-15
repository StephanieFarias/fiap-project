import api from './api';
import Cookie from 'js-cookie';

const isBrowser = typeof window !== 'undefined';
export const FIAP_PROJECT_TOKEN = 'FIAP_PROJECT_TOKEN';
export const PATIENT_ID = 'PATIENT_ID';
export const isAuthenticated = () =>
  isBrowser && window.localStorage.getItem(FIAP_PROJECT_TOKEN) !== null;
export const getToken = () =>
  isBrowser ? window.localStorage.getItem(FIAP_PROJECT_TOKEN) : '';
export const getPatientId = () =>
  isBrowser ? window.localStorage.getItem(PATIENT_ID) : '';

export const setToken = (token, patientId) => {
  if (isBrowser) {
    window.localStorage.setItem(FIAP_PROJECT_TOKEN, token);
    window.localStorage.setItem(PATIENT_ID, patientId);
    Cookie.set(FIAP_PROJECT_TOKEN, token);
    Cookie.set(PATIENT_ID, patientId);
  }
};

export const logout = () => {
  if (isBrowser) {
    window.localStorage.removeItem(FIAP_PROJECT_TOKEN);
    window.localStorage.removeItem(PATIENT_ID);
    Cookie.remove(FIAP_PROJECT_TOKEN);
    Cookie.remove(PATIENT_ID);
  }
};

export const Auth = {
  login: ({ username, password }) => api.post('/authenticate', { username, password }),
  register: ({ username, password }) => api.post('/register', { username, password }),
};
