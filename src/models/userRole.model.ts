import knex from '../databases/knex';
import table from '../databases/table';
import { UserRoleType } from '../types/access.type';
import { convertData } from '../utils/convert.utils';

const columnId = knex.raw(['role_uuid as "roleId"', 'user_uuid as "userId"']);

class UserRoleModel {
  
  async existsOne(payload: UserRoleType) {
    const { roleId, userId } = payload;
    const sql = knex.select(columnId).from(table.user_roles).first();

    
    if (roleId && userId) {
      sql.where('role_uuid', roleId).andWhere('user_uuid', userId);
    }
    
    const result = await sql;

    if (result && result.roleId && result.userId) {
      return true;
    }

    return false;
  }

  create(payload: UserRoleType) {
    const dataCreate = convertData(payload, USER_ROLE_CORE);
    return knex(table.user_roles).returning(columnId).insert(dataCreate);
  }

  update(payload: UserRoleType) {
    const uuid = payload.roleId;
    const dataUpdate = convertData(payload, USER_ROLE_CORE);
    return knex(table.user_roles).where('role_uuid', uuid).update(dataUpdate);
  }
}

export default new UserRoleModel();