import table from '../databases/table';
import knex from '../databases/knex';
import { KeyToken } from '../types/access.type';
import ip from 'ip';
import moment from 'moment';

class KeyTokenService {
    create = async (payload: KeyToken) => {
        payload.ip_address = ip.address();
        return await knex(table.key_token).insert(payload);
    }

    find = async (payload: KeyToken) => {
        return knex(table.key_token)
        .where('user_uuid', payload.user_uuid)
        .andWhere('ip_address', payload.ip_address)
        .select('refresh_token').first();
    }
    

    update = async (payload: KeyToken) => {
        const dataUpdate = payload;

        delete dataUpdate.user_uuid;
        delete dataUpdate.ip_address;

        return knex(table.key_token)
        .where('user_uuid', payload.user_uuid)
        .andWhere('ip_address', payload.ip_address)
        .update(dataUpdate);    
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