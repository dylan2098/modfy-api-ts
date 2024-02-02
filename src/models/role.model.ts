import table from '../databases/table';
import knex from '../databases/knex';
import { RoleType } from '../types/access.type';
import { convertData, attributes } from '../utils/convert.utils';
import { v4 as uuidv4 } from 'uuid';
import { ROLE_CORE } from '../core/access.core';

const columnId = knex.raw('role_uuid as "roleId"');

class RoleModel {
  
  findAll(){
    const column = attributes(ROLE_CORE, ['_id', 'name']);
    return knex.select(knex.raw(column)).from(table.roles);
  }


  async existsOne(payload: RoleType) {
    const { roleId, name } = payload;
    const sql = knex.select(columnId).from(table.roles).first();

    if (name) {
      sql.where('role_name', name);
    }
    
    if (roleId) {
      sql.where('role_uuid', roleId);
    }
    
    const result = await sql;

    if (result && result.roleId) {
      return true;
    }

    return false;
  }

  create(payload: RoleType) {
    payload.roleId = uuidv4();

    const dataCreate = convertData(payload, ROLE_CORE);
    return knex(table.roles).returning(columnId).insert(dataCreate);
  }

  update(payload: RoleType) {
    const uuid = payload.roleId;
    const dataUpdate = convertData(payload, ROLE_CORE);
    return knex(table.roles).where('role_uuid', uuid).update(dataUpdate);
  }
}

export default new RoleModel();