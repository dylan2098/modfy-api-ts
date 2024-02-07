import table from '../databases/table';
import knex from '../databases/knex';
import { User,  } from '../types/access.type';
import utils from '../utils/utils';

class UserModel {
  async find(payload: User) : Promise<User[]> {
    let sql = knex.select().from(table.users).returning('user_uuid');

    const { user_uuid, user_email, user_phone} = payload;

    if (user_uuid) {
      sql.where('user_uuid', user_uuid);
    }

    if (user_email) {
      sql.where('user_email', user_email);
    }

    if(user_phone) {
      if(user_email)  {
        sql.orWhere('user_phone', user_phone);
      } else {
        sql.where('user_phone', user_phone);
      }
    }

    return await sql;
  }

  create(payload: User) {
    payload.user_created_at = utils.defaultNow();
    payload.user_updated_at = utils.defaultNow();
    
    return knex(table.users).returning('user_uuid').insert(payload);
  }

  update(payload: User) {
    payload.user_updated_at = utils.defaultNow();
    return knex(table.users).where('user_uuid', payload.user_uuid).update(payload);
  }
}

export default new UserModel();
