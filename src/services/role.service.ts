import { ROLE_STATUS } from '../core/access/role.core';
import roleModel from '../models/role.model';
import { RoleType } from '../types/access.type';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';

class RoleService {
  create = async (payload: RoleType) => {
    try {
      let { role_name } = payload;

      if (!role_name) {
        throw new BadRequestError('Create role failed, name is required');
      }

      role_name = role_name.toLowerCase();

      const isExists = await roleModel.existsOne({ role_name });
      if (isExists) {
        throw new BadRequestError('Role exists');
      }

      const newRole = (await roleModel.create(payload)) as RoleType[];

      if (!newRole) {
        throw new BadRequestError('Create role failed');
      }

      return newRole;
    } catch (error) {
      throw error;
    }
  };

  update = async (payload: RoleType) => {
    try {
      if (!payload || !payload.role_uuid) {
        throw new BadRequestError('Update role failed');
      }

      const { role_uuid } = payload;

      const isExists = await roleModel.existsOne({ role_uuid });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.role_name) {
        payload.role_name = payload.role_name.toLowerCase();
      }

      const resultUpdate = await roleModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: RoleType) => {
    try {
      if (!payload || !payload.role_uuid) {
        throw new BadRequestError('Delete role failed');
      }

      const { role_uuid } = payload;

      const isExists = await roleModel.existsOne({ role_uuid });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await roleModel.update({ role_uuid, role_status: ROLE_STATUS.BLOCK });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  };

  getAll = () => {
    try {
      return roleModel.findAll();
    } catch (error) {
      throw error;
    }
  };
}

export default new RoleService();
