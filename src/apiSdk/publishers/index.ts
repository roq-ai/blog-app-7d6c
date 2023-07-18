import axios from 'axios';
import queryString from 'query-string';
import { PublisherInterface, PublisherGetQueryInterface } from 'interfaces/publisher';
import { GetQueryInterface } from '../../interfaces';

export const getPublishers = async (query?: PublisherGetQueryInterface) => {
  const response = await axios.get(`/api/publishers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPublisher = async (publisher: PublisherInterface) => {
  const response = await axios.post('/api/publishers', publisher);
  return response.data;
};

export const updatePublisherById = async (id: string, publisher: PublisherInterface) => {
  const response = await axios.put(`/api/publishers/${id}`, publisher);
  return response.data;
};

export const getPublisherById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/publishers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePublisherById = async (id: string) => {
  const response = await axios.delete(`/api/publishers/${id}`);
  return response.data;
};
