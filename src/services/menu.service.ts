import { Menu } from '../core/types/access.type';
import MenuModel from '../models/menu.model';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';
import { MENU_STATUS } from '../core/access/menu.core';

class MenuService {
  async create(payload: Menu) {
    try {
      let { menu_name, menu_path } = payload;

      if (!menu_name || !menu_path) {
        throw new BadRequestError('Invalid data');
      }

      menu_name = menu_name.toLowerCase();
      menu_path = menu_path.toLowerCase();

      const exists = await MenuModel.exists({ menu_name, menu_path });
      if (exists) {
        throw new BadRequestError('Menu exists');
      }

      const menu = (await MenuModel.create(payload)) as Menu[];

      if (!menu) {
        throw new BadRequestError('Create role failed');
      }

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return MenuModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Menu) {
    try {
      if (!payload || !payload.menu_id) {
        throw new BadRequestError('Update menu failed');
      }

      const { menu_id } = payload;

      const exists = await MenuModel.exists({ menu_id });

      if (!exists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.menu_name) {
        payload.menu_name = payload.menu_name.toLowerCase();
      }

      if(payload.menu_path) {
        payload.menu_path = payload.menu_path.toLowerCase();
      }

      const resultUpdate = await MenuModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Menu) {
    try {
      if (!payload || !payload.menu_id) {
        throw new BadRequestError('Delete failed');
      }

      const { menu_id } = payload;

      const exists = await MenuModel.exists({ menu_id });

      if (!exists) {
        throw new BadRequestError('Not exists');
      }

      const resultDelete = await MenuModel.update({ menu_id, menu_status: MENU_STATUS.BLOCK });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  }
}

export default new MenuService();
