import { Request } from 'express';

export interface CustomRequest extends Request {
  keyStore?: any;
  userId?: string;
  refreshToken?: string;
  roleName?: string;
}
