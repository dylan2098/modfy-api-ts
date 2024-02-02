import { MenuType } from '../types/access.type';
import menuModel from '../models/menu.model';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';
import { MENU_STATUS } from '../core/access/menu.core';

class MenuService {
  async create(payload: MenuType) {
    try {
      let { menu_name, menu_path } = payload;

      if (!menu_name || !menu_path) {
        throw new BadRequestError('Invalid data');
      }

      menu_name = menu_name.toLowerCase();
      menu_path = menu_path.toLowerCase();

      const isExists = await menuModel.existsOne({ menu_name, menu_path });
      if (isExists) {
        throw new BadRequestError('Menu exists');
      }

      const menu = (await menuModel.create(payload)) as MenuType[];

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
      return menuModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: MenuType) {
    try {
      if (!payload || !payload.menu_uuid) {
        throw new BadRequestError('Update role failed');
      }

      const { menu_uuid } = payload;

      const isExists = await menuModel.existsOne({ menu_uuid });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.menu_name) {
        payload.menu_name = payload.menu_name.toLowerCase();
      }

      if(payload.menu_path) {
        payload.menu_path = payload.menu_path.toLowerCase();
      }

      const resultUpdate = await menuModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: MenuType) {
    try {
      if (!payload || !payload.menu_uuid) {
        throw new BadRequestError('Delete failed');
      }

      const { menu_uuid } = payload;

      const isExists = await menuModel.existsOne({ menu_uuid });

      if (!isExists) {
        throw new BadRequestError('Not exists');
      }

      const resultDelete = await menuModel.update({ menu_uuid, menu_status: MENU_STATUS.BLOCK });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  }
}

export default new MenuService();
