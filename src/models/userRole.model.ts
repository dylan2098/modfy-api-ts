import knex from '../databases/knex';
import table from '../databases/table';
import { UserRole } from '../types/access.type';

class UserRoleModel {
  async exists(payload: UserRole) {
    const { role_id, user_id } = payload;
    const sql = knex.select('role_id', 'user_id').from(table.user_role).first();

    if (role_id && user_id) {
      sql.where('role_id', role_id).andWhere('user_id', user_id);
    }

    const result = await sql;

    if (result && result.role_id && result.user_id) {
      return true;
    }

    return false;
  }

  create(payload: UserRole) {
    return knex(table.user_role).returning(['role_id', 'user_id']).insert(payload);
  }

  update(payload: UserRole) {
    return knex(table.user_role)
      .where('role_id', payload.role_id)
      .andWhere('user_id', payload.user_id)
      .update(payload);
  }
}

export default new UserRoleModel();
