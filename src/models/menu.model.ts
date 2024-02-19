import table from '../databases/table';
import knex from '../databases/knex';
import { Menu } from '../core/types/access.type';

class MenuModel {
  async findAll (): Promise<Menu[]> {
    return knex.select('menu_id', 'menu_name', 'menu_path', 'menu_status').from(table.menus);
  }

  async exists (payload: Menu) {
    const {menu_id, menu_name, menu_path} = payload;
    const sql = knex.select('menu_id').from(table.menus).first();

    if (menu_id) {
      sql.where({menu_id: menu_id});
    }

    if (menu_name) {
      sql.where({menu_name: menu_name});
    }

    if(menu_path) {
      sql.where({menu_path: menu_path});
    }

    const result = await sql;

    if(result && result.menu_id) {
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
