import { ROLE_STATUS } from '../core/access.core';
import roleModel from '../models/role.model';
import { RoleType } from '../types/access.type';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response.js';

class RoleService {
  create = async (payload: RoleType) => {
    try {
      let { name } = payload;

      if (!name) {
        throw new BadRequestError('Create role failed, name is required');
      }

      name = name.toLowerCase();

      const isExists = await roleModel.existsOne({ name });
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
      if (!payload || !payload.roleId) {
        throw new BadRequestError('Update role failed');
      }

      const { roleId } = payload;

      const isExists = await roleModel.existsOne({ roleId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.name) {
        payload.name = payload.name.toLowerCase();
      }

      const resultUpdate = await roleModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: RoleType) => {
    try {
      if (!payload || !payload.roleId) {
        throw new BadRequestError('Delete role failed');
      }

      const { roleId } = payload;

      const isExists = await roleModel.existsOne({ roleId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await roleModel.update({ roleId, status: ROLE_STATUS.BLOCK });

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
