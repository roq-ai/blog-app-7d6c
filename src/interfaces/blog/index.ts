import { BlogCategoryInterface } from 'interfaces/blog-category';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface BlogInterface {
  id?: string;
  title: string;
  content: string;
  publisher_id?: string;
  created_at?: any;
  updated_at?: any;
  blog_category?: BlogCategoryInterface[];
  publisher?: PublisherInterface;
  _count?: {
    blog_category?: number;
  };
}

export interface BlogGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  publisher_id?: string;
}
