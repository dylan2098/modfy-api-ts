import { NextFunction, Request, Response } from 'express';
import { KeyToken, User } from '../types/access.type';
import jwt from 'jsonwebtoken';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, NotFoundError } from './error.response';
import keyTokenService from '../services/keyToken.service';

const HEADER = {
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-token-id',
  CLIENT_ID: 'x-client-id',
};

export const createTokenPair = async (payload: User, publicKey: string, privateKey: string) => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: '2 days',
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { access_token: accessToken, refresh_token: privateKey };
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async (token: any, keySecret: any) => {
  return jwt.verify(token, keySecret);
};

export const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userUUID = req.headers[HEADER.CLIENT_ID] as string;
  if (!userUUID) throw new AuthFailureError('Invalid Request');

  const keyStore = await keyTokenService.find({ user_uuid: userUUID, ip_address: req.ip });
  interface CustomRequest extends Request {
    keyStore: any;
    user: User;
  }

  if (!keyStore) throw new NotFoundError('Token not found');

  if (req.headers[HEADER.AUTHORIZATION]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string;
      const decodeUser: any = jwt.verify(refreshToken, keyStore.private_key);
      if (userUUID !== decodeUser.user_uuid)
        throw new AuthFailureError('Invalid Request');

      (req as CustomRequest).keyStore = keyStore;
      (req as CustomRequest).user = decodeUser;

      return next();
    } catch (error) {
      throw error;
    }
  }
});
