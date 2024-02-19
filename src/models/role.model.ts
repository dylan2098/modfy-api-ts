import table from '../databases/table';
import knex from '../databases/knex';
import { Role } from '../core/types/access.type';

class RoleModel {
  
  findAll() : Promise<Role[]>{
    return knex.select('role_id', 'role_name', 'role_status').from(table.roles);
  }

  async exists(payload: Role) {
    const { role_id, role_name } = payload;
    const sql = knex.select('role_id').from(table.roles).first();

    if (role_name) {
      sql.where('role_name', role_name);
    }
    
    if (role_id) {
      sql.where('role_id', role_id);
    }
    
    const result = await sql;

    if (result && result.role_id) {
      return true;
    }

    return false;
  }

  create(payload: Role) {
    return knex(table.roles).returning('role_id').insert(payload);
  }

  update(payload: Role) {
    return knex(table.roles).where('role_id', payload.role_id).update(payload);
  }

  findOne(payload: Role) {
    const { role_id, role_name } = payload;
    const sql = knex.select('role_id').from(table.roles).first();

    if (role_name) {
      sql.where('role_name', role_name);
    }
    
    if (role_id) {
      sql.where('role_id', role_id);
    }

    return sql;
  }
}

export default new RoleModel();