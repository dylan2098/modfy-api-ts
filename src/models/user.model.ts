import table from '../databases/table';
import knex from '../databases/knex';
import { User,  } from '../core/types/access.type';
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
      queryBuilder.where('Users.user_id', user_id);
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

  async findDetail(payload: User) : Promise<User[]> {
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
      'Addresses.address_id',
      'address_street',
      'address_city',
      'address_country',
      'address_zipcode',
      'address_phone',
      'customer_first_name',
      'customer_last_name',
      'address_selected'
    ];

    let queryBuilder = knex.select(columns)
                      .from<User>(table.users)
                      .where('Users.user_id', payload.user_id)
                      .innerJoin(table.user_role, 'Users.user_id', 'UserRole.user_id')
                      .innerJoin(table.roles, 'UserRole.role_id', 'Roles.role_id')
                      .innerJoin(table.address_book, 'Users.user_id', 'AddressBooks.user_id')
                      .innerJoin(table.addresses, 'AddressBooks.address_id', 'Addresses.address_id')
                      ;

    const { user_id, user_email, user_phone} = payload;

    if (user_id) {
      queryBuilder.where('Users.user_id', user_id);
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

    const data = await queryBuilder;
    const transformedData = {
      ...data[0],
      address: data.map(item => ({ 
        address_street: item.address_street,
        address_city: item.address_city,
        address_country: item.address_country,
        address_zipcode: item.address_zipcode,
        address_phone: item.address_phone,
        customer_first_name: item.customer_first_name,
        customer_last_name: item.customer_last_name,
        address_selected: item.address_selected
      }))
    };

    delete transformedData.address_street;
    delete transformedData.address_city;
    delete transformedData.address_country;
    delete transformedData.address_zipcode;
    delete transformedData.address_phone;
    delete transformedData.customer_first_name;
    delete transformedData.customer_last_name;
    delete transformedData.address_selected;

    return transformedData;
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

  getEmailAndPasswordById(userId: string) : Promise<User>{
    return knex.select('user_password', 'user_email').from(table.users).where('user_id', userId).first();
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

    const result: any = await queryBuilder;
    return result.length > 0;
  }
}

export default new UserModel();
