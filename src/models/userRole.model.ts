import knex from '../databases/knex';
import table from '../databases/table';
import { UserRoleType } from '../types/access.type';

const columnId = knex.raw(['role_uuid as "roleId"', 'user_uuid as "userId"']);

class UserRoleModel {
  async existsOne(payload: UserRoleType) {
    const { role_uuid, user_uuid } = payload;
    const sql = knex.select(columnId).from(table.user_roles).first();

    if (role_uuid && user_uuid) {
      sql.where('role_uuid', role_uuid).andWhere('user_uuid', user_uuid);
    }

    const result = await sql;

    if (result && result.roleId && result.userId) {
      return true;
    }

    return false;
  }

  create(payload: UserRoleType) {
    return knex(table.user_roles).returning(['role_uuid', 'user_uuid']).insert(payload);
  }

  update(payload: UserRoleType) {
    return knex(table.user_roles)
      .where('role_uuid', payload.role_uuid)
      .andWhere('user_uuid', payload.user_uuid)
      .update(payload);
  }
}

export default new UserRoleModel();
