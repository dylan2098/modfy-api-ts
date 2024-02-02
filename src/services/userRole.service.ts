import { USER_ROLE_STATUS } from '../core/access/userRole.core';
import userRoleModel from '../models/userRole.model';
import { UserRoleType } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class UserRoleService {
  create = async (payload: UserRoleType) => {
    try {
      let { userId, roleId } = payload;

      if (!userId) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await userRoleModel.existsOne({ userId, roleId });
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

  update = async (payload: UserRoleType) => {
    try {
      if (!payload || !payload.roleId) {
        throw new BadRequestError('Update failed');
      }

      const { roleId } = payload;

      const isExists = await userRoleModel.existsOne({ roleId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultUpdate = await userRoleModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: UserRoleType) => {
    try {
      if (!payload || !payload.roleId) {
        throw new BadRequestError('Delete failed');
      }

      const { roleId } = payload;

      const isExists = await userRoleModel.existsOne({ roleId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await userRoleModel.update({ roleId, status: USER_ROLE_STATUS.BLOCK });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRoleService();
