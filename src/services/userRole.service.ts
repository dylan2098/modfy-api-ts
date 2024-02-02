import { USER_ROLE_STATUS } from '../core/access/userRole.core';
import userRoleModel from '../models/userRole.model';
import { UserRoleType } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class UserRoleService {
  create = async (payload: UserRoleType) => {
    try {
      let { user_uuid, role_uuid } = payload;

      if (!user_uuid) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await userRoleModel.existsOne({ user_uuid, role_uuid });
      if (isExists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = (await userRoleModel.create(payload)) as UserRoleType[];

      if (!userRole) {
        throw new BadRequestError('Create failed');
      }

      return userRole;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRoleService();
