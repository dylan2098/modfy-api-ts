import { MENU_ROLE_STATUS } from '../core/access/roleMenu';
import roleMenuModel from '../models/roleMenu.model';
import { RoleMenuType } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class RoleMenuService {
  create = async (payload: RoleMenuType) => {
    try {
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await roleMenuModel.existsOne({ menu_uuid, role_uuid });
      if (isExists) {
        throw new BadRequestError('Data exists');
      }

      const userRole = (await roleMenuModel.create(payload)) as RoleMenuType[];

      if (!userRole) {
        throw new BadRequestError('Create failed');
      }

      return userRole;
    } catch (error) {
      throw error;
    }
  };

  update = async (payload: RoleMenuType) => {
    try {
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await roleMenuModel.existsOne({ menu_uuid, role_uuid });
      if (!isExists) {
        throw new BadRequestError('Data not exists');
      }

      const roleMenu = await roleMenuModel.update(payload);

      if (!roleMenu) {
        throw new BadRequestError('Update failed');
      }

      return roleMenu;
    } catch (error) {
      throw error;
    }
  };

  delete = async (payload: RoleMenuType) => {
    try {
      let { menu_uuid, role_uuid } = payload;

      if (!menu_uuid) {
        throw new BadRequestError('Create failed');
      }

      const isExists = await roleMenuModel.existsOne({ menu_uuid, role_uuid });
      if (!isExists) {
        throw new BadRequestError('Data exists');
      }

      payload.menu_role_status = MENU_ROLE_STATUS.BLOCK;
      const roleMenu = await roleMenuModel.update(payload);

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
