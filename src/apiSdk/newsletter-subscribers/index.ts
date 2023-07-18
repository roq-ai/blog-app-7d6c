import axios from 'axios';
import queryString from 'query-string';
import { NewsletterSubscriberInterface, NewsletterSubscriberGetQueryInterface } from 'interfaces/newsletter-subscriber';
import { GetQueryInterface } from '../../interfaces';

export const getNewsletterSubscribers = async (query?: NewsletterSubscriberGetQueryInterface) => {
  const response = await axios.get(`/api/newsletter-subscribers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createNewsletterSubscriber = async (newsletterSubscriber: NewsletterSubscriberInterface) => {
  const response = await axios.post('/api/newsletter-subscribers', newsletterSubscriber);
  return response.data;
};

export const updateNewsletterSubscriberById = async (
  id: string,
  newsletterSubscriber: NewsletterSubscriberInterface,
) => {
  const response = await axios.put(`/api/newsletter-subscribers/${id}`, newsletterSubscriber);
  return response.data;
};

export const getNewsletterSubscriberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/newsletter-subscribers/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteNewsletterSubscriberById = async (id: string) => {
  const response = await axios.delete(`/api/newsletter-subscribers/${id}`);
  return response.data;
};
