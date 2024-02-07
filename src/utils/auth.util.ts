import { NextFunction, Request, Response } from 'express';
import { User } from '../types/access.type';
import jwt from 'jsonwebtoken';

const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const keyService = require('../services/keyToken.service');
const HEADER = {
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-token-id',
  CLIENT_ID: 'x-client-id',
};

export const createTokenPair = async (
  payload: User,
  publicKey: string,
  privateKey: string
) => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: '2 days',
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: '7 days',
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  /*
        1 - Check userId missing??
        2 - get accessToken
        3 - verifyToken
        4 - check user in db
        5 - check keyStore with this userId??
        6 - OK all => return next()
    */
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError('Invalid Request');

  const keyStore = await keyService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keyStore');

  //3
  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string;
      const decodeUser = jwt.verify(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId)
        throw new AuthFailureError('Invalid UserId');

      // neu refresh token hợp lệ sẽ đi vào controller
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (err) {
      throw err;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError('Invalid Request');

  try {
    // Note issue: nếu hacker truyền refresh token vào access token thì sao?
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError('Invalid userId');
    req.keyStore = keyStore;
    req.user = decodeUser;
    return next();
  } catch (err) {
    throw err;
  }
});

export const verifyJWT = async (token, keySecret) => {
  return jwt.verify(token, keySecret);
};
