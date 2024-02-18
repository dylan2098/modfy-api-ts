import table from '../databases/table';
import knex from '../databases/knex';
import { User,  } from '../types/access.type';
import utils from '../utils/utils';

class UserModel {
  async find(payload: User) : Promise<User[]> {
    const columns = [
      'Users.user_id',
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
                      .innerJoin(table.user_role, 'Users.user_id', 'UserRole.user_id')
                      .innerJoin(table.roles, 'UserRole.role_id', 'Roles.role_id')
                      ;

    const { user_id, user_email, user_phone} = payload;

    if (user_id) {
      queryBuilder.where('user_id', user_id);
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

  create(payload: User) : Promise<User[]>{
    payload.user_created_at = utils.defaultNow();
    payload.user_updated_at = utils.defaultNow();
    
    return knex(table.users).returning('user_id').insert(payload);
  }

  update(payload: User) {
    payload.user_updated_at = utils.defaultNow();
    return knex(table.users).where('user_id', payload.user_id).update(payload);
  }

  
  async exists(payload: User) : Promise<boolean> {
    const queryBuilder = knex.select('user_id').from(table.users)

    if (payload.user_id) {
      queryBuilder.where('user_id', payload.user_id);
    }

    if (payload.user_email) {
      queryBuilder.where('user_email', payload.user_email);
    }

    if (payload.user_phone) {
      queryBuilder.where('user_phone', payload.user_phone);
    }

    const result = await queryBuilder;
    return result.length > 0;
  }
}

export default new UserModel();
