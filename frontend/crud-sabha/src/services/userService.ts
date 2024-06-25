// src/services/userService.ts
import api from './api';
import { User } from '../types/User';

type NewUser = Omit<User, 'id'>;

const getUsers = async (): Promise<User[]> => {
  const response = await api.apiJson.get<User[]>('/users');
  return response.data;
};

const createUser = async (user: NewUser) => {
  const response = await api.apiJson.post('/users', user);
  return response.data;
};

export { getUsers, createUser };
