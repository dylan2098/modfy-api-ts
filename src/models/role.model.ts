import table from '../databases/table';
import knex from '../databases/knex';
import { Role } from '../types/access.type';

class RoleModel {
  
  findAll() : Promise<Role[]>{
    return knex.select('role_uuid', 'role_name', 'role_status').from(table.roles);
  }

  async exists(payload: Role) {
    const { role_uuid, role_name } = payload;
    const sql = knex.select('role_uuid').from(table.roles).first();

    if (role_name) {
      sql.where('role_name', role_name);
    }
    
    if (role_uuid) {
      sql.where('role_uuid', role_uuid);
    }
    
    const result = await sql;

    if (result && result.role_uuid) {
      return true;
    }

    return false;
  }

  create(payload: Role) {
    return knex(table.roles).returning('role_uuid').insert(payload);
  }

  update(payload: Role) {
    return knex(table.roles).where('role_uuid', payload.role_uuid).update(payload);
  }

  findOne(payload: Role) {
    const { role_uuid, role_name } = payload;
    const sql = knex.select('role_uuid').from(table.roles).first();

    if (role_name) {
      sql.where('role_name', role_name);
    }
    
    if (role_uuid) {
      sql.where('role_uuid', role_uuid);
    }

    return sql;
  }
}

export default new RoleModel();