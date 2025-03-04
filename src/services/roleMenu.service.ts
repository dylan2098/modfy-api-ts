import { STATUS } from '../core/status.core';
import RoleMenuModel from '../models/roleMenu.model';
import { RoleMenu } from '../core/types/access.type';
import { BadRequestError} from '../utils/error.response';

class RoleMenuService {
  create = async (payload: RoleMenu) => {
    try {
      let { menu_id, role_id } = payload;

      if (!menu_id) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_id, role_id });
      if (exists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = await RoleMenuModel.create(payload);

      if (!userRole) {
        throw new BadRequestError('Create failed');
      }

      return userRole;
    } catch (error) {
      throw error;
    }
  };

  update = async (payload: RoleMenu) => {
    try {
      let { menu_id, role_id } = payload;

      if (!menu_id) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_id, role_id });
      if (!exists) {
        throw new BadRequestError('Data not exists');
      }

      const roleMenu = await RoleMenuModel.update(payload);

      if (!roleMenu) {
        throw new BadRequestError('Update failed');
      }

      return roleMenu;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: RoleMenu) => {
    try {
      let { menu_id, role_id } = payload;

      if (!menu_id) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_id, role_id });
      if (!exists) {
        throw new BadRequestError('Data exists');
      }

      payload.menu_role_status = STATUS.INACTIVE;
      const roleMenu = await RoleMenuModel.update(payload);

      if (!roleMenu) {
        throw new BadRequestError('Delete failed');
      }

      return roleMenu;
    } catch (error) {
      throw error;
    }
  };
}

export default new RoleMenuService();
