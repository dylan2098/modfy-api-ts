'use strict';

import table from '../core/table';
import knex from '../databases/knex';
import { UserType } from '../types/user.type';
import utils from '../utils/utils';

class UserModel {
    async find({userId, email}: UserType ) {

        let sql = knex.select().from(table.users);

        if(userId) {
            sql.where('userId', userId);
        }

        if(email) {
            sql.where('email', email);
        }

        return await sql;
    }

    create(payload: UserType) {
        const column = ['userId'];
        return knex(table.users).returning(column).insert(payload);
    }

    update(payload: UserType) {
        payload.createdAt = utils.defaultNow();
        return knex(table.users).where('userId', payload.userId).update(payload);
    }
}

export default new UserModel();