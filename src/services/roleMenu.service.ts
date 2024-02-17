import { MENU_ROLE_STATUS } from '../core/access/roleMenu';
import RoleMenuModel from '../models/roleMenu.model';
import { RoleMenu } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class RoleMenuService {
  create = async (payload: RoleMenu) => {
    try {
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_uuid, role_uuid });
      if (exists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = (await RoleMenuModel.create(payload)) as RoleMenu[];

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
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_uuid, role_uuid });
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
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const exists = await RoleMenuModel.exists({ menu_uuid, role_uuid });
      if (!exists) {
        throw new BadRequestError('Data exists');
      }

      payload.menu_role_status = MENU_ROLE_STATUS.BLOCK;
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
