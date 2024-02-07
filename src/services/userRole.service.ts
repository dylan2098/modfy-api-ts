import { USER_ROLE_STATUS } from '../core/access/userRole.core';
import UserRoleModel from '../models/userRole.model';
import { UserRole } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class UserRoleService {
  create = async (payload: UserRole) => {
    try {
      let { user_uuid, role_uuid } = payload;

      if (!user_uuid || !role_uuid) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await UserRoleModel.existsOne({ user_uuid, role_uuid });
      if (isExists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = (await UserRoleModel.create(payload)) as UserRole[];

      if (!userRole) {
        throw new BadRequestError('Create failed');
      }

      return userRole;
    } catch (error) {
      throw error;
    }
  };

  update = async (payload: UserRole) => {
    try {
      let { user_uuid, role_uuid } = payload;

      if (!user_uuid || !role_uuid) {
        throw new BadRequestError('Update failed');
      }

      const isExists = await UserRoleModel.existsOne({ user_uuid, role_uuid });
      if (!isExists) {
        throw new BadRequestError('Data not exists');
      }

      const userRole = await UserRoleModel.update(payload);

      if (!userRole) {
        throw new BadRequestError('Update failed');
      }

      return userRole;
      
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: UserRole) => {
    try {
      let { user_uuid, role_uuid } = payload;

      if (!user_uuid || !role_uuid) {
        throw new BadRequestError('Delete failed');
      }

      const isExists = await UserRoleModel.existsOne({ user_uuid, role_uuid });
      if (!isExists) {
        throw new BadRequestError('Data not exists');
      }

      payload.user_role_status = USER_ROLE_STATUS.BLOCK;
      const userRole = await UserRoleModel.update(payload);

      if (!userRole) {
        throw new BadRequestError('Delete failed');
      }

      return userRole;
      
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRoleService();
