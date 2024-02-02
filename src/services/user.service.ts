import crypto from "node:crypto";
import userModel from "../models/user.model.js";
import utils from "../utils/utils.js";
import { hash } from "../helpers/hash.js";
import { UserType } from "../types/access.type.js";
import { USER_STATUS } from "../core/access/user.core.js";
import { emitRegisterSuccess } from "../events/user.event.js";
import {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  ForbiddenError,
} from "../utils/error.response.js";

class UserService {
  /**
   * Signup new user
   * @param payload
   * @returns new user
   */
  signUp = async (payload: UserType) => {
    try {
      const { user_email, user_password, user_first_name, user_last_name, user_phone } = payload;

      if (!utils.regexEmail(user_email as string)) {
        throw new BadRequestError("Email invalid.");
      }

      if (!utils.regexPhone(user_email as string)) {
        throw new BadRequestError("Phone invalid");
      }

      // check user exists
      const userExists = await userModel.find({ user_email, user_phone });
      if (userExists && userExists.length > 0) {
        throw new BadRequestError("User already registered.");
      }

      const passwordHash = await hash(user_password as string);
      payload.user_password = passwordHash;

      const newUser = (await userModel.create(payload)) as UserType[];

      if (!newUser) {
        throw new BadRequestError("Create User Failed.");
      }

      emitRegisterSuccess({
        user_email,
        user_first_name,
        user_last_name,
        user_uuid: newUser[0].user_uuid,
      });


      /**
       * //! TODO: 
       * 1. Handle refresh token and accesstoken using private key and public key
       * 2. Login after register
       */
      // const privateKey = crypto.randomBytes(64).toString('hex');
      // const publicKey = crypto.randomBytes(64).toString('hex');

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  authenticateEmail = async (param) => {
    try {
      const { code } = param;

      if (!code) {
        throw new BadRequestError("Active User Failed.");
      }

      const user = await userModel.find({ user_uuid: code });
      if (!user || user.length == 0) {
        throw new BadRequestError("Active User Failed.");
      }

      const resultUpdate = await userModel.update({
        user_uuid: code,
        user_status: USER_STATUS.ACTIVE,
      });

      if(resultUpdate) {
        /** //!TODO
         * 1. Add role user
         * 
         */
      }

      return resultUpdate;

    } catch (error) {
      throw error;
    }
  };
}

export default new UserService();
