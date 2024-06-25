// src/services/itemService.ts
import api from './api';
import { Item } from '../types/Item';

type NewItem = Omit<Item, 'id'>;

const getItems = async (): Promise<Item[]> => {
  const response = await api.apiJson.get<Item[]>('/items');
  return response.data;
};

const createItem = async (item: NewItem) => {
  const response = await api.apiJson.post('/items', item);
  return response.data;
};

export { getItems, createItem };
