import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const eee = JSON.stringify(error);
    console.dir(JSON.parse(eee));
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      console.log('заходит в http');
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<AuthResponse>('/api/refresh', { withCredentials: true });
        localStorage.setItem('token', data.token);
        return api.request(originalRequest);
      } catch (error) {
        console.log('Необходима авторизация');
      }
    }
    throw error;
  },
);
