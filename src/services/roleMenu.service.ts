import { ROLE_MENU_STATUS } from '../core/access/roleMenu';
import roleMenuModel from '../models/roleMenu.model';
import { RoleMenuType } from '../types/access.type';
import { BadRequestError} from '../utils/error.response';

class UserRoleService {
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
}

export default new UserRoleService();
