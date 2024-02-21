import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import UserModel from '../models/user.model';
import utils from '../utils/utils';
import { createTokenPair } from '../utils/auth.util';
import { encodeId, hash } from '../helpers/hash';
import { User } from '../core/types/access.type';
import { ROLE } from '../core/access/role.core';
import { USER_STATUS } from '../core/access/user.core';
import { emitRegisterSuccess } from '../events/user.event';
import RoleService from './role.service';
import UserRoleService from './userRole.service';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';
import { USER_ROLE_STATUS } from '../core/access/userRole.core';
import keyTokenModel from '../models/keyToken.model';

class UserService {
  signUp = async (payload: User) => {
    try {
      const { user_email, user_password, user_first_name, user_last_name, user_phone } = payload;

      if (!utils.regexEmail(user_email as string)) {
        throw new BadRequestError('Email invalid.');
      }

      if (!utils.regexPhone(user_phone as string)) {
        throw new BadRequestError('Phone invalid');
      }

      // check user exists
      const exists = await UserModel.exists({ user_email, user_phone });
      if (exists) {
        throw new BadRequestError('User already registered.');
      }

      const passwordHash = await hash(user_password as string);
      payload.user_password = passwordHash;

      const newUser = await UserModel.create(payload);
      if (!newUser) {
        throw new BadRequestError('Create User Failed.');
      }

      emitRegisterSuccess({
        user_email,
        user_first_name,
        user_last_name,
        user_id: newUser[0].user_id,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  authenticateEmail = async (payload: User) => {
    try {
      const { user_id } = payload;

      if (!user_id) {
        throw new BadRequestError('Active User Failed.');
      }

      const exists = await UserModel.exists({ user_id });
      if (!exists) {
        throw new BadRequestError('Active User Failed.');
      }

      const result = await UserModel.update({
        user_id,
        user_status: USER_STATUS.ACTIVE,
      });

      if (result) {
        const roleCustomerUUID = await RoleService.getRole(ROLE.CUSTOMER);
        const optionActiveAccount = {
          user_id,
          role_id: roleCustomerUUID,
          user_role_status: USER_ROLE_STATUS.ACTIVE,
        };

        await UserRoleService.create(optionActiveAccount);
      }

      return result;

    } catch (error) {
      throw error;
    }
  };

  login = async (payload: User) => {
    try {
      const { user_email, user_password, user_phone } = payload;

      const foundUser = await UserModel.find({ user_email, user_phone });
      if (!foundUser || foundUser.length == 0) {
        throw new BadRequestError('User is not registered or activated');
      }

      const match = await bcrypt.compare(user_password as string, foundUser[0].user_password as string);
      if (!match) {
        throw new AuthFailureError('Authentication error')
      };

      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      const hashData = { user_id: foundUser[0].user_id };
      const tokens = await createTokenPair(hashData, publicKey, privateKey);

      const responseCreateToken = await keyTokenModel.create({
        user_id: foundUser[0].user_id,
        refresh_token: tokens.refresh_token,
        private_key: privateKey,
        public_key: publicKey,
      });

      if(!responseCreateToken || !responseCreateToken.length) {
        throw new ConflictRequestError('Create token failed');
      }

      const result = foundUser[0];
      result.access_token = tokens.access_token;
      result.refresh_token = tokens.refresh_token;
      result.access_id = encodeId(responseCreateToken[0].key_token_id as number);
      delete result.user_password;

      return [result];
    } catch (error) {
      throw error;
    }
  };

  refreshToken = async (payload: any) => {
    try {
      const {userId, refreshToken, keyStore} = payload;

      if(refreshToken !== keyStore.refresh_token) {
        throw new AuthFailureError("Account not registered!");
      }

      const foundUser = await UserModel.find({user_id: userId});
      if(!foundUser || foundUser.length == 0) {
        throw new AuthFailureError("Account not registered!");
      }

      // create new refresh token and update to database
      const hashData = { user_id: foundUser[0].user_id };
      const tokens = await createTokenPair(hashData, keyStore.public_key, keyStore.private_key);

      await keyTokenModel.update({user_id: userId, refresh_token: tokens.refresh_token, key_token_id: keyStore.key_token_id});

      const result = {
        user_id: foundUser[0].user_id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteTokenExpired = () => {
    try {
      return keyTokenModel.deleteTokenExpired();
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();