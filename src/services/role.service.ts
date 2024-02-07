import { ROLE_STATUS } from '../core/access/role.core';
import RoleModel from '../models/role.model';
import { Role } from '../types/access.type';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';

class RoleService {
  create = async (payload: Role) => {
    try {
      let { role_name } = payload;

      if (!role_name) {
        throw new BadRequestError('Create role failed, name is required');
      }

      role_name = role_name.toLowerCase();

      const isExists = await RoleModel.existsOne({ role_name });
      if (isExists) {
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
      if (!payload || !payload.role_uuid) {
        throw new BadRequestError('Update role failed');
      }

      const { role_uuid } = payload;

      const isExists = await RoleModel.existsOne({ role_uuid });

      if (!isExists) {
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
      if (!payload || !payload.role_uuid) {
        throw new BadRequestError('Delete role failed');
      }

      const { role_uuid } = payload;

      const isExists = await RoleModel.existsOne({ role_uuid });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await RoleModel.update({ role_uuid, role_status: ROLE_STATUS.BLOCK });

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

  getRoleCustomerUUID = async () => {
    try {
        const roleCustomer = await RoleModel.findOne({ role_name: 'customer' }); 
        if(roleCustomer && roleCustomer.role_uuid) {
            return roleCustomer.role_uuid;
        }
        
        throw new BadRequestError('Role not exists');
    } catch (error) {
        throw error;
    }
  }
}

export default new RoleService();
