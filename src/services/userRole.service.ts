import { STATUS } from '../core/status.core';
import UserRoleModel from '../models/userRole.model';
import { UserRole } from '../core/types/access.type';
import { BadRequestError} from '../utils/error.response';

class UserRoleService {
  create = async (payload: UserRole) => {
    try {
      let { user_id, role_id } = payload;

      if (!user_id || !role_id) {
        throw new BadRequestError('Create failed');
      }

      const exists = await UserRoleModel.exists({ user_id, role_id });
      if (exists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = await UserRoleModel.create(payload);

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
      let { user_id, role_id } = payload;

      if (!user_id || !role_id) {
        throw new BadRequestError('Update failed');
      }

      const exists = await UserRoleModel.exists({ user_id, role_id });
      if (!exists) {
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
      let { user_id, role_id } = payload;

      if (!user_id || !role_id) {
        throw new BadRequestError('Delete failed');
      }

      const exists = await UserRoleModel.exists({ user_id, role_id });
      if (!exists) {
        throw new BadRequestError('Data not exists');
      }

      payload.user_role_status = STATUS.INACTIVE;
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
