import { BlogCategoryInterface } from 'interfaces/blog-category';
import { GetQueryInterface } from 'interfaces';

export interface CategoryInterface {
  id?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  blog_category?: BlogCategoryInterface[];

  _count?: {
    blog_category?: number;
  };
}

export interface CategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
