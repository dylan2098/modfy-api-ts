import { NextFunction, Request, Response } from 'express';
import { User } from '../core/types/access.type';
import jwt from 'jsonwebtoken';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, ForbiddenError , NotFoundError } from './error.response';
import keyTokenService from '../services/keyToken.service';
import { CustomRequest } from '../core/interfaces/request';
import ip from 'ip';
import Hashids from 'hashids/cjs';
import UserModel from '../models/user.model';

const HEADER = {
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-token-id',
  CLIENT_ID: 'x-client-id',
  ACCESS_ID: 'x-access-id',
};

export const createTokenPair = async (payload: User, publicKey: string, privateKey: string) => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
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

const getAccessToken = (token: string) => {
  if (!token) {
    throw new AuthFailureError('Invalid Request');
  }

  const arrayAuth = token.split(' ');

  if (arrayAuth.length !== 2) {
    throw new AuthFailureError('Invalid Request');
  }

  const bearer = arrayAuth[0];
  const accessToken = arrayAuth[1];

  if (bearer.toLowerCase() !== 'bearer') {
    throw new AuthFailureError('Invalid Request');
  }

  return accessToken;
};


/**
 * Authorize token and check user
 */
export const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers[HEADER.CLIENT_ID] as string;
    const accessId = req.headers[HEADER.ACCESS_ID] as string;

    if (!userId || !accessId) {
      throw new AuthFailureError('Invalid Request');
    }

    const hashids = new Hashids(process.env.HASHIDS_SALT, parseInt(process.env.HASHIDS_LENGTH as string));
    const tokenIndex = parseInt(hashids.decode(accessId).toString());

    const keyStore = await keyTokenService.find({ user_id: userId, ip_address: ip.address(), key_token_id: tokenIndex });
    if (!keyStore) {
      throw new NotFoundError('Token not found');
    }

    const accessToken = getAccessToken(req.headers[HEADER.AUTHORIZATION] as string);
    
    const decodeUser: any = jwt.verify(accessToken, keyStore.public_key);
    if (userId !== decodeUser.user_id) {
      throw new AuthFailureError('Invalid Request');
    }

    const findUser = await UserModel.find({ user_id: decodeUser.user_id });
    if(!findUser || findUser.length === 0) {
      throw new AuthFailureError('Invalid Request');
    }

    req.keyStore = keyStore;
    req.userId = findUser[0].user_id;
    req.roleName = findUser[0].role_name;
    req.refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string;

    return next();
  } catch (error) {
    throw error;
  }
});

export const permissions = (roles: string[]) => {
  return asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    if(roles.indexOf(req.roleName as string) === -1) {
      throw new ForbiddenError('Permission denied');
    }
    return next();
  });
}