import table from '../databases/table';
import knex from '../databases/knex';
import { KeyToken } from '../core/types/access.type';
import ip from 'ip';
import moment from 'moment';

class KeyTokenService {
    create = async (payload: KeyToken) => {
        payload.ip_address = ip.address();
        return await knex(table.key_token).insert(payload);
    }

    find = async (payload: KeyToken) => {
        return knex(table.key_token)
        .where('key_token_id', payload.key_token_id)
        .select(['refresh_token','private_key', 'public_key', 'key_token_id']).first();
    }
    
    update = async (payload: KeyToken) => {
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
}

export default new KeyTokenService();