import { User } from '../../types/access.type';
import { Request } from 'express';

export interface CustomRequest extends Request {
  keyStore: any;
  user: User;
}
