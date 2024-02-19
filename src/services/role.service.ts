import { ROLE_STATUS } from '../core/access/role.core';
import RoleModel from '../models/role.model';
import { Role } from '../core/types/access.type';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';

class RoleService {
  create = async (payload: Role) => {
    try {
      let { role_name } = payload;

      if (!role_name) {
        throw new BadRequestError('Create role failed, name is required');
      }

      role_name = role_name.toLowerCase();

      const exists = await RoleModel.exists({ role_name });
      if (exists) {
        throw new BadRequestError('Role exists');
      }

      const newRole = (await RoleModel.create(payload)) as Role[];

      if (!newRole) {
        throw new BadRequestError('Create role failed');
      }

      return newRole;
    } catch (error) {
      throw error;
    }
  };

  update = async (payload: Role) => {
    try {
      if (!payload || !payload.role_id) {
        throw new BadRequestError('Update role failed');
      }

      const { role_id } = payload;

      const exists = await RoleModel.exists({ role_id });

      if (!exists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.role_name) {
        payload.role_name = payload.role_name.toLowerCase();
      }

      const resultUpdate = await RoleModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: Role) => {
    try {
      if (!payload || !payload.role_id) {
        throw new BadRequestError('Delete role failed');
      }

      const { role_id } = payload;

      const exists = await RoleModel.exists({ role_id });

      if (!exists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await RoleModel.update({
        role_id,
        role_status: ROLE_STATUS.BLOCK,
      });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  };

  getAll = () => {
    try {
      return RoleModel.findAll();
    } catch (error) {
      throw error;
    }
  };

  getRole = async (type: string) => {
    try {
      const roleCustomer = await RoleModel.findOne({ role_name: type });
      if (roleCustomer && roleCustomer.role_id) {
        return roleCustomer.role_id;
      }

      throw new BadRequestError('Role not exists');
    } catch (error) {
      throw error;
    }
  };
}

export default new RoleService();
