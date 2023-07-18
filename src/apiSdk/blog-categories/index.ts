import axios from 'axios';
import queryString from 'query-string';
import { BlogCategoryInterface, BlogCategoryGetQueryInterface } from 'interfaces/blog-category';
import { GetQueryInterface } from '../../interfaces';

export const getBlogCategories = async (query?: BlogCategoryGetQueryInterface) => {
  const response = await axios.get(`/api/blog-categories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBlogCategory = async (blogCategory: BlogCategoryInterface) => {
  const response = await axios.post('/api/blog-categories', blogCategory);
  return response.data;
};

export const updateBlogCategoryById = async (id: string, blogCategory: BlogCategoryInterface) => {
  const response = await axios.put(`/api/blog-categories/${id}`, blogCategory);
  return response.data;
};

export const getBlogCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/blog-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBlogCategoryById = async (id: string) => {
  const response = await axios.delete(`/api/blog-categories/${id}`);
  return response.data;
};
