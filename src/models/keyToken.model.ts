import table from '../databases/table';
import knex from '../databases/knex';
import { KeyToken } from '../core/types/access.type';
import ip from 'ip';
import utils from '../utils/utils';
import moment from 'moment';

class KeyTokenService {
    create = async (payload: KeyToken) : Promise<KeyToken[]> => {
        payload.ip_address = ip.address();
        return await knex(table.key_token).insert(payload).returning('key_token_id');
    }

    find = async (payload: KeyToken) => {
        return knex(table.key_token)
        .where('key_token_id', payload.key_token_id)
        .select(['refresh_token','private_key', 'public_key', 'key_token_id']).first();
    }
    
    update = async (payload: KeyToken) => {
        payload.updated_at = utils.defaultNow();
        return knex(table.key_token)
        .where('user_id', payload.user_id)
        .andWhere('key_token_id', payload.key_token_id)
        .update(payload);    
    }

    verifyToken = async (payload: KeyToken) => {
        const token = this.find(payload);
        if (!token) {
            return false;
        }
        return true;
    }

    deleteTokenExpired = async () => {
        const numDays = process.env.DELETE_TOKEN_EXPIRE;
        return knex(table.key_token).delete().where('updated_at', '<', moment(Date.now()).subtract(numDays, 'd'));
    }
}

export default new KeyTokenService();