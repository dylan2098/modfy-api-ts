import knex from '../databases/knex';
import table from '../databases/table';
import { RoleMenu } from '../core/types/access.type';

class RoleMenuModel {
  async exists(payload: RoleMenu) {
    const { role_id, menu_id } = payload;
    const sql = knex.select('role_id', 'menu_id').from(table.role_menus).first();

    if (role_id && menu_id) {
      sql.where('role_id', role_id).andWhere('menu_id', menu_id);
    }

    const result = await sql;

    if (result && result.role_id && result.menu_id) {
      return true;
    }

    return false;
  }

  create(payload: RoleMenu) : Promise<RoleMenu[]> {
    return knex(table.role_menus).returning(['role_id', 'menu_id']).insert(payload);
  }

  update(payload: RoleMenu) {
    const { role_id, menu_id } = payload;

    return knex(table.role_menus)
      .where('role_id', role_id)
      .andWhere('menu_id', menu_id)
      .update(payload);
  }
}

export default new RoleMenuModel();
