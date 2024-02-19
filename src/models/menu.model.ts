import table from '../databases/table';
import knex from '../databases/knex';
import { Menu } from '../core/types/access.type';

class MenuModel {
  async findAll (): Promise<Menu[]> {
    return knex.select('menu_id', 'menu_name', 'menu_path', 'menu_status').from(table.menus);
  }

  async findOne(payload: Menu) {
    const {menu_id, menu_name, menu_path} = payload;
    const queryBuilder = knex.select('menu_id').from(table.menus);

    if (menu_id) {
      queryBuilder.where('menu_id', menu_id);
    }

    if (menu_name) {
      queryBuilder.where('menu_name', menu_name);
    }

    if(menu_path) {
      queryBuilder.orWhere('menu_path', menu_path);
    }

    return await queryBuilder;
  }


  async exists (payload: Menu) {
    const result = await this.findOne(payload);
    if(result && result.length > 0) {
      return true;
    }

    return false;
  }

  create(payload: Menu) {
    return knex(table.menus).returning('menu_id').insert(payload);
  }

  update(payload: Menu) {
    return knex(table.menus).where('menu_id', payload.menu_id).update(payload);
  }
}

export default new MenuModel();
