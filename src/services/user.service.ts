'use strict';

import crypto from 'node:crypto';
import userModel from '../models/user.model.js';
import utils from '../utils/utils.js';
import { hash } from '../helpers/hash.js';
import { UserType } from '../types/user.type';
import {emitRegisterSuccess} from '../events/user.event.js';


import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response.js';

class UserService {
  /**
   * Signup new user
   * @param payload 
   * @returns new user
   */
  signUp = async (payload: UserType) => {
    try {
      const { email, password, firstName, lastName, phone} = payload;

      if (!utils.regexEmail(email as string)) {
        throw new BadRequestError('Email invalid.');
      }

      if (!utils.regexPhone(phone as string)) {
        throw new BadRequestError('Phone invalid');
      }

      // check user exists
      const userExists = await userModel.find({ email, phone });
      if (userExists && userExists.length > 0) {
        throw new BadRequestError('User already registered.');
      }

      const passwordHash = await hash(password as string);
      payload.password = passwordHash;

      const newUser = await userModel.create(payload);

      if (!newUser || !newUser.length) {
        throw new BadRequestError('Create User Failed.');
      }

      emitRegisterSuccess({
        email, firstName, lastName
      });

      // const privateKey = crypto.randomBytes(64).toString('hex');
      // const publicKey = crypto.randomBytes(64).toString('hex');

      return newUser;

    } catch (error) {
      throw error;
    }
  };
}

export default new UserService();