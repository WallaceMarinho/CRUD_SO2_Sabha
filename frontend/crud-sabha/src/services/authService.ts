// services/authService.ts

import api from './api';

export const loginUser = async (email: string, senha: string): Promise<string> => {
  const response = await api.apiJson.post('/users/login', { email, senha });
  const token = response.data.token;
  return token;
};

export const logoutUser = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};
