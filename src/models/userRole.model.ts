import knex from '../databases/knex';
import table from '../databases/table';
import { UserRole } from '../types/access.type';

class UserRoleModel {
  async existsOne(payload: UserRole) {
    const { role_uuid, user_uuid } = payload;
    const sql = knex.select('role_uuid', 'user_uuid').from(table.user_role).first();

    if (role_uuid && user_uuid) {
      sql.where('role_uuid', role_uuid).andWhere('user_uuid', user_uuid);
    }

    const result = await sql;

    if (result && result.role_uuid && result.user_uuid) {
      return true;
    }

    return false;
  }

  create(payload: UserRole) {
    return knex(table.user_role).returning(['role_uuid', 'user_uuid']).insert(payload);
  }

  update(payload: UserRole) {
    return knex(table.user_role)
      .where('role_uuid', payload.role_uuid)
      .andWhere('user_uuid', payload.user_uuid)
      .update(payload);
  }
}

export default new UserRoleModel();
