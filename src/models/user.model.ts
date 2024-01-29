'use strict';

import table from '../databases/table';
import knex from '../databases/knex';
import { UserType } from '../types/user.type';
import utils from '../utils/utils';

class UserModel {
  convert(obj: UserType) {
    return {
      user_email: obj.email,
      user_password: obj.password,
      user_first_name: obj.firstName,
      user_last_name: obj.lastName,
      user_phone: obj.phone,
      user_gender: obj.gender,
      user_birthday: obj.birthday,
      user_avatar: obj.avatar,
      user_created_at: obj.createdAt,
      user_updated_at: obj.updatedAt,
    }
  }

  async find({ userId, email, phone }: UserType) {
    let sql = knex.select().from(table.users).returning(['user_uuid']);

    if (userId) {
      sql.where('user_id', userId);
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
    
    const user = this.convert(payload);
    return knex(table.users).returning(['user_uuid']).insert(user);
  }

  update(payload: UserType) {
    payload.updatedAt = utils.defaultNow();
    return knex(table.users).where('user_uuid', payload.userId).update(payload);
  }
}

export default new UserModel();
