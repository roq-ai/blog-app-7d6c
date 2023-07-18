import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface NewsletterSubscriberInterface {
  id?: string;
  email: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface NewsletterSubscriberGetQueryInterface extends GetQueryInterface {
  id?: string;
  email?: string;
  user_id?: string;
}
