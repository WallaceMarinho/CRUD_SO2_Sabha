import api from './api';
import { User } from '../types/User';

type NewUser = Omit<User, 'id'>;

const getUsers = async (): Promise<User[]> => {
  const response = await api.apiJson.get<User[]>('/users');
  return response.data;
};

const getUserById = async (id: string): Promise<User> => {
  const response = await api.apiJson.get<User>(`/users/${id}`);
  return response.data;
};

const createUser = async (user: NewUser) => {
  const response = await api.apiJson.post('/users', user);
  return response.data;
};

const updateUser = async (user: User) => {
  const response = await api.apiJson.put(`/users/${user.id}`, user);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await api.apiJson.delete(`/users/${id}`);
  return response.data;
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
