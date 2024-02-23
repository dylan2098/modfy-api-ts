import table from '../databases/table';
import knex from '../databases/knex';
import { Address, AddressBooks } from '../core/types/access.type';

class AddressModel {
  createAddress(payload: Address): Promise<Address[]> {
    return knex(table.addresses).returning('address_id').insert(payload);
  }

  updateAddress(payload: Address) {
    return knex(table.addresses).where('address_id', payload.address_id).update(payload);
  }

  deleteAddress(payload: Address) {
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

  createAddressBook(payload: AddressBooks) {
    return knex(table.address_book).returning('address_book_id').insert(payload);
  }

  async existsAddressBook(payload: AddressBooks) {
    const { user_id, address_id } = payload;
    const result = await knex
      .select('address_book_id')
      .from(table.address_book)
      .where('user_id', user_id)
      .andWhere('address_id', address_id);

    if(result && result.length > 0) {
      return true;
    }

    return false;
  }
}

export default new AddressModel();
