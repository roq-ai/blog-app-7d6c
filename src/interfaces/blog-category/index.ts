import { BlogInterface } from 'interfaces/blog';
import { CategoryInterface } from 'interfaces/category';
import { GetQueryInterface } from 'interfaces';

export interface BlogCategoryInterface {
  id?: string;
  blog_id?: string;
  category_id?: string;
  created_at?: any;
  updated_at?: any;

  blog?: BlogInterface;
  category?: CategoryInterface;
  _count?: {};
}

export interface BlogCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  blog_id?: string;
  category_id?: string;
}
