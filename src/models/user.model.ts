import table from '../databases/table';
import knex from '../databases/knex';
import { UserType } from '../types/user.type';
import utils from '../utils/utils';
import { convertDataUser } from '../utils/user.util';

class UserModel {
  async find({ userNo, email, phone }: UserType) {
    let sql = knex.select().from(table.users).returning(knex.raw('user_uuid as "userNo"'));

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
    payload.createdAt = utils.defaultNow();
    payload.updatedAt = utils.defaultNow();
    
    const user = convertDataUser(payload);
    return knex(table.users).returning(knex.raw('user_uuid as "userNo"')).insert(user);
  }

  update(payload: UserType) {
    payload.updatedAt = utils.defaultNow();
    const dataUpdate = convertDataUser(payload);
    return knex(table.users).where('user_uuid', payload.userNo).update(dataUpdate);
  }
}

export default new UserModel();
