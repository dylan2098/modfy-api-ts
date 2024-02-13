import { NextFunction, Request, Response } from 'express';
import { User } from '../types/access.type';
import jwt from 'jsonwebtoken';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, NotFoundError } from './error.response';


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


export const verifyJWT = async (token, keySecret) => {
  return jwt.verify(token, keySecret);
};
