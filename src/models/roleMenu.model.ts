import knex from '../databases/knex';
import table from '../databases/table';
import { RoleMenuType } from '../types/access.type';

class RoleMenuModel {
  async existsOne(payload: RoleMenuType) {
    const { role_uuid, menu_uuid } = payload;
    const sql = knex.select('role_uuid', 'menu_uuid').from(table.role_menus).first();

    if (role_uuid && menu_uuid) {
      sql.where('role_uuid', role_uuid).andWhere('menu_uuid', menu_uuid);
    }

    const result = await sql;

    if (result && result.roleId && result.userId) {
      return true;
    }

    return false;
  }

  create(payload: RoleMenuType) {
    return knex(table.role_menus).returning(['role_uuid', 'menu_uuid']).insert(payload);
  }

  update(payload: RoleMenuType) {
    const { role_uuid, menu_uuid } = payload;

    return knex(table.role_menus)
      .where('role_uuid', role_uuid)
      .andWhere('menu_uuid', menu_uuid)
      .update(payload);
  }
}

export default new RoleMenuModel();
