import table from '../databases/table';
import knex from '../databases/knex';
import { Address } from '../core/types/access.type';

class AddressModel {
  create(payload: Address): Promise<Address[]> {
    return knex(table.addresses).returning('address_id').insert(payload);
  }

  update(payload: Address) {
    return knex(table.addresses).where('address_id', payload.address_id).update(payload);
  }

  delete(payload: Address) {
    return knex(table.addresses).where('address_id', payload.address_id).del();
  }

  findOne(payload: Address) {
    const { address_id } = payload;
    return knex.select('address_id').from(table.addresses).where('address_id', address_id);
  }

  async exists(payload: Address) {
    const result = await this.findOne(payload);
    if (result && result.length > 0) {
      return true;
    }
    return false;
  }
}

export default new AddressModel();
