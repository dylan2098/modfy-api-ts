import table from '../databases/table';
import knex from '../databases/knex';
import { MenuType } from '../types/access.type';
import { v4 as uuidv4 } from 'uuid';
import { MENU_STATUS } from '../core/access.core';

class MenuModel {
  async findAll () {
    return knex.select(knex.raw(['menu_uuid as "menuId"', 'menu_name as "menuName"'])).from(table.menus);
  }

  async existsOne (payload: MenuType) {
    const {menuId, name, path} = payload;
    const sql = knex.select(knex.raw('menu_uuid as "menuId"')).from(table.menus).first();

    if (menuId) {
      sql.where({menu_uuid: menuId});
    }

    if (name) {
      sql.where({menu_name: name});
    }

    if(path) {
      sql.where({menu_path: path});
    }

    const result = await sql;

    if(result && result.menuId) {
      return true;
    }

    return false;
  }

  create(payload: MenuType) {
  }

  update() {

  }
}

export default new MenuModel();
