import api from './api';
import Cookie from 'js-cookie';

const isBrowser = typeof window !== 'undefined';
export const FIAP_PROJECT_TOKEN = 'FIAP_PROJECT_TOKEN';
export const isAuthenticated = () =>
  isBrowser && window.localStorage.getItem(FIAP_PROJECT_TOKEN) !== null;
export const getToken = () =>
  isBrowser ? window.localStorage.getItem(FIAP_PROJECT_TOKEN) : '';

export const setToken = (token) => {
  if (isBrowser) {
    window.localStorage.setItem(FIAP_PROJECT_TOKEN, token);
    Cookie.set(FIAP_PROJECT_TOKEN, token);
  }
};

export const logout = () => {
  if (isBrowser) {
    window.localStorage.removeItem(FIAP_PROJECT_TOKEN);
    Cookie.remove(FIAP_PROJECT_TOKEN);
  }
};

export const Auth = {
  login: ({ username, password }) => api.post('/authenticate', { username, password }),
  register: ({ username, password }) => api.post('/register', { username, password }),
};
