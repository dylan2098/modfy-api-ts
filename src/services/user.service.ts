import crypto from 'node:crypto';
import UserModel from '../models/user.model';
import utils from '../utils/utils';
import { hash } from '../helpers/hash';
import { UserType } from '../types/access.type';
import { USER_STATUS } from '../core/access/user.core';
import { emitRegisterSuccess } from '../events/user.event';
import RoleService from './role.service';
import UserRoleService from './userRole.service';

import {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  ForbiddenError,
} from '../utils/error.response';
import { USER_ROLE_STATUS } from '../core/access/userRole.core';

class UserService {
  /**
   * Signup new user
   * @param payload
   * @returns new user
   */
  signUp = async (payload: UserType) => {
    try {
      const {
        user_email,
        user_password,
        user_first_name,
        user_last_name,
        user_phone,
      } = payload;

      if (!utils.regexEmail(user_email as string)) {
        throw new BadRequestError('Email invalid.');
      }

      if (!utils.regexPhone(user_phone as string)) {
        throw new BadRequestError('Phone invalid');
      }

      // check user exists
      const userExists = await UserModel.find({ user_email, user_phone });
      if (userExists && userExists.length > 0) {
        throw new BadRequestError('User already registered.');
      }

      const passwordHash = await hash(user_password as string);
      payload.user_password = passwordHash;

      const newUser = (await UserModel.create(payload)) as UserType[];

      if (!newUser) {
        throw new BadRequestError('Create User Failed.');
      }

      emitRegisterSuccess({
        user_email,
        user_first_name,
        user_last_name,
        user_uuid: newUser[0].user_uuid,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  authenticateEmail = async (param) => {
    try {
      const { code } = param;

      if (!code) {
        throw new BadRequestError('Active User Failed.');
      }

      const user = await UserModel.find({ user_uuid: code });
      if (!user || user.length == 0) {
        throw new BadRequestError('Active User Failed.');
      }

      const resultUpdate = await UserModel.update({
        user_uuid: code,
        user_status: USER_STATUS.ACTIVE,
      });

      if (resultUpdate) {
        const roleCustomerUUID = await RoleService.getRoleCustomerUUID();
        const optionActiveAcocunt = {
          user_uuid: code,
          role_uuid: roleCustomerUUID,
          user_role_status: USER_ROLE_STATUS.ACTIVE,
        };

        await UserRoleService.create(optionActiveAcocunt);
      }

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserService();
