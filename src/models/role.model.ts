import table from '../databases/table';
import knex from '../databases/knex';
import { RoleType } from '../types/role.type';
import { convertDataRole } from '../utils/access/role.utils';
import { v4 as uuidv4 } from 'uuid';
import { ROLE_STATUS } from '../core/user.core';

const columnId = knex.raw('role_uuid as "roleId"');

class RoleModel {

  /**
   * Finds roles based on the provided payload.
   * @param payload The payload containing the search criteria.
   * @returns A promise that resolves to the found roles.
   */
  async find(payload: RoleType) {
    let sql = knex.select().from(table.roles).returning(columnId);

    const { name } = payload;

    if (name) {
      sql.where('role_name', name);
    }

    return await sql;
  }



  /**
   * Retrieves all roles from the database.
   * 
   * @returns {Promise<any[]>} A promise that resolves to an array of roles.
   */
  findAll(){
    return knex.select(knex.raw(['role_uuid as "roleId"', 'role_name as "name"'])).from(table.roles);
  }


  /**
   * Checks if a role exists in the database based on the provided payload.
   * @param payload - The payload containing the role information.
   * @returns A boolean indicating whether the role exists or not.
   */
  async existsOne(payload: RoleType) {
    const { name, roleId } = payload;
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

  
  /**
   * Creates a new role.
   * @param payload The role data to be created.
   * @returns A promise that resolves to the ID of the newly created role.
   */
  create(payload: RoleType) {
    payload.roleId = uuidv4();
    payload.status = ROLE_STATUS.ACTIVE;
    const dataCreate = convertDataRole(payload);
    return knex(table.roles).returning(columnId).insert(dataCreate);
  }

  update(payload: RoleType) {
    const uuid = payload.roleId;
    const dataUpdate = convertDataRole(payload, 'update');
    return knex(table.roles).where('role_uuid', uuid).update(dataUpdate);
  }
}

export default new RoleModel();
