import { MenuType } from '../types/access.type';
import menuModel from '../models/menu.model';
import { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } from '../utils/error.response';
import { MENU_STATUS } from '../core/access.core';

class MenuService {
  async create(payload: MenuType) {
    try {
      let { name, path } = payload;

      if (!name || !path) {
        throw new BadRequestError('Invalid data');
      }

      name = name.toLowerCase();
      path = path.toLowerCase();

      const isExists = await menuModel.existsOne({ name, path });
      if (isExists) {
        throw new BadRequestError('Menu exists');
      }

      const newRole = (await menuModel.create(payload)) as MenuType[];

      if (!newRole) {
        throw new BadRequestError('Create role failed');
      }

      return newRole;
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
      if (!payload || !payload.menuId) {
        throw new BadRequestError('Update role failed');
      }

      const { menuId } = payload;

      const isExists = await menuModel.existsOne({ menuId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      if (payload.name) {
        payload.name = payload.name.toLowerCase();
      }

      if(payload.path) {
        payload.path = payload.path.toLowerCase();
      }

      const resultUpdate = await menuModel.update(payload);

      return resultUpdate;
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: MenuType) {
    try {
      if (!payload || !payload.menuId) {
        throw new BadRequestError('Delete role failed');
      }

      const { menuId } = payload;

      const isExists = await menuModel.existsOne({ menuId });

      if (!isExists) {
        throw new BadRequestError('Role not exists');
      }

      const resultDelete = await menuModel.update({ menuId, status: MENU_STATUS.BLOCK });

      return resultDelete;
    } catch (error) {
      throw error;
    }
  }
}

export default new MenuService();
