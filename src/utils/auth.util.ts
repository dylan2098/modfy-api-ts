import { NextFunction, Request, Response } from 'express';
import { KeyToken, User } from '../types/access.type';
import jwt from 'jsonwebtoken';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, NotFoundError } from './error.response';
import keyTokenService from '../services/keyToken.service';
import { CustomRequest } from '../core/interfaces/request';
import ip from 'ip';

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
    
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
  });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async (token: any, keySecret: any) => {
  return jwt.verify(token, keySecret);
};

export const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string;
  if (!userId) 
    throw new AuthFailureError('Invalid Request');

  const keyStore = await keyTokenService.find({ user_id: userId, ip_address: ip.address() });
  if (!keyStore) throw new NotFoundError('Token not found');

  if (req.headers[HEADER.AUTHORIZATION]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string;
      const decodeUser: any = jwt.verify(refreshToken, keyStore.private_key);
      if (userId !== decodeUser.user_id)
        throw new AuthFailureError('Invalid Request');

      (req as CustomRequest).keyStore = keyStore;
      (req as CustomRequest).user = decodeUser;

      return next();
    } catch (error) {
      throw error;
    }
  }
});
