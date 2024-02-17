import knex from '../databases/knex';
import table from '../databases/table';
import { RoleMenu } from '../types/access.type';

class RoleMenuModel {
  async exists(payload: RoleMenu) {
    const { role_uuid, menu_uuid } = payload;
    const sql = knex.select('role_uuid', 'menu_uuid').from(table.role_menus).first();

    if (role_uuid && menu_uuid) {
      sql.where('role_uuid', role_uuid).andWhere('menu_uuid', menu_uuid);
    }

    const result = await sql;

    if (result && result.role_uuid && result.menu_uuid) {
      return true;
    }

    return false;
  }

  create(payload: RoleMenu) {
    return knex(table.role_menus).returning(['role_uuid', 'menu_uuid']).insert(payload);
  }

  update(payload: RoleMenu) {
    const { role_uuid, menu_uuid } = payload;

    return knex(table.role_menus)
      .where('role_uuid', role_uuid)
      .andWhere('menu_uuid', menu_uuid)
      .update(payload);
  }
}

export default new RoleMenuModel();
