import table from '../databases/table';
import knex from '../databases/knex';
import { UserType,  } from '../types/access.type';
import utils from '../utils/utils';
import { convertData } from '../utils/convert.utils';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { USER_CORE } from '../core/access/user.core';

class UserModel {
  async find(payload: UserType) {
    let sql = knex.select().from(table.users).returning(knex.raw('user_uuid as "userNo"'));

    const { userNo, email, phone} = payload;

    if (userNo) {
      sql.where('user_uuid', userNo);
    }

    if (email) {
      sql.where('user_email', email);
    }

    if(phone) {
      if(email)  {
        sql.orWhere('user_phone', phone);
      } else {
        sql.where('user_phone', phone);
      }
    }

    return await sql;
  }

  create(payload: UserType) {
    payload.userNo = uuidv4();
    payload.createdAt = utils.defaultNow();
    payload.updatedAt = utils.defaultNow();
    
    const dataCreate = convertData(payload, USER_CORE);
    return knex(table.users).returning(knex.raw('user_uuid as "userNo"')).insert(dataCreate);
  }

  update(payload: UserType) {
    payload.updatedAt = utils.defaultNow();
    const dataUpdate = convertData(payload, USER_CORE);
    return knex(table.users).where('user_uuid', payload.userNo).update(dataUpdate);
  }
}

export default new UserModel();
