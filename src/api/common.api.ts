import axios from 'axios';
import { ItemInfo } from '../types';

export const getCategories = async () => {
  const res = await axios.get('/categories');
  return res.data;
};

export const getItems = async (date) => {
  const _url = `/items?monthCategory=${date}&_sort=timestamp&_order=desc`;
  const res = await axios.get(_url);
  return res.data;
};

export const delItem = async (id) => {
  const res = await axios.delete(`/items/${id}`);
  return res;
};

export const createItem = async (item: ItemInfo) => {
  const res = await axios.post('/items', item);
  return res;
};

export const updateItem = async (id: string, item: ItemInfo) => {
  const res = await axios.put(`/items/${id}`, item);
  return res;
};