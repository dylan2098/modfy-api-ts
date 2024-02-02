import table from '../databases/table';
import knex from '../databases/knex';
import { MenuType } from '../types/access.type';
import { MENU_CORE } from '../core/access.core';
import { convertData, attributes } from '../utils/convert.utils';
import { v4 as uuidv4 } from 'uuid';

const columnId = knex.raw('menu_uuid as "menuId"');
class MenuModel {
  async findAll () {
    const column = attributes(MENU_CORE, ['menuId', 'name', 'path', 'status']);
    return knex.select(knex.raw(column)).from(table.menus);
  }

  async existsOne (payload: MenuType) {
    const {menuId, name, path} = payload;
    const sql = knex.select(columnId).from(table.menus).first();

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
    payload.menuId = uuidv4();
    const dataCreate = convertData(payload, MENU_CORE);
    return knex(table.menus).returning(columnId).insert(dataCreate);
  }

  update(payload: MenuType) {
    const uuid = payload.menuId;
    const dataUpdate = convertData(payload, MENU_CORE);
    return knex(table.menus).where('menu_uuid', uuid).update(dataUpdate);
  }
}

export default new MenuModel();
