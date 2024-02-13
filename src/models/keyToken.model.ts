import table from '../databases/table';
import knex from '../databases/knex';
import { KeyToken } from '../types/access.type';


class KeyTokenService {
    create = async (payload: KeyToken) => {
        // insert refresh token used to database
        return await knex(table.key_token).insert(payload);
    }

    update = async (payload: KeyToken) => {
        return knex(table.key_token).where('user_uuid', payload.user_uuid).update(payload);    
    }

}

export default new KeyTokenService();