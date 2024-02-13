import table from '../databases/table';
import knex from '../databases/knex';
import { User,  } from '../types/access.type';
import utils from '../utils/utils';

class UserModel {
  async find(payload: User) : Promise<User[]> {
    const columns = [
      'Users.user_uuid',
      'user_email',
      'user_first_name',
      'user_last_name',
      'user_phone',
      'user_password',
      'user_gender',
      'user_birthday',
      'user_avatar',
      'user_status',
      'role_name',
    ];

    let queryBuilder = knex.select(columns)
                      .from<User>(table.users)
                      .innerJoin(table.user_role, 'Users.user_uuid', 'UserRole.user_uuid')
                      .innerJoin(table.roles, 'UserRole.role_uuid', 'Roles.role_uuid')
                      ;

    const { user_uuid, user_email, user_phone} = payload;

    if (user_uuid) {
      queryBuilder.where('user_uuid', user_uuid);
    }

    if (user_email) {
      queryBuilder.where('user_email', user_email);
    }

    if(user_phone) {
      if(user_email)  {
        queryBuilder.orWhere('user_phone', user_phone);
      } else {
        queryBuilder.where('user_phone', user_phone);
      }
    }

    return await queryBuilder;
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
