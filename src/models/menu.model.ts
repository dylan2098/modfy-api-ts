import table from '../databases/table';
import knex from '../databases/knex';
import { MenuType } from '../types/access.type';

class MenuModel {
  async findAll () {
    return knex.select('menu_uuid').from(table.menus);
  }

  async existsOne (payload: MenuType) {
    const {menu_uuid, menu_name, menu_path} = payload;
    const sql = knex.select('menu_uuid').from(table.menus).first();

    if (menu_uuid) {
      sql.where({menu_uuid: menu_uuid});
    }

    if (menu_name) {
      sql.where({menu_name: menu_name});
    }

    if(menu_path) {
      sql.where({menu_path: menu_path});
    }

    const result = await sql;

    if(result && result.menu_uuid) {
      return true;
    }

    return false;
  }

  create(payload: MenuType) {
    return knex(table.menus).returning('menu_uuid').insert(payload);
  }

  update(payload: MenuType) {
    return knex(table.menus).where('menu_uuid', payload.menu_uuid).update(payload);
  }
}

export default new MenuModel();
