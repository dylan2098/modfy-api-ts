import { Address } from '../core/types/access.type';
import AddressModel from '../models/address.model';
import {
  BadRequestError,
} from '../utils/error.response';

class AddressService {
  create(payload: Address) {
    try {
      return AddressModel.createAddress(payload);
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Address) {
    try {
      const { address_id } = payload;
      const exists = await AddressModel.exists({ address_id });
      if (!exists) {
        throw new BadRequestError('Address not exists');
      }

      return AddressModel.updateAddress(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Address) {
    try {
      const { address_id } = payload;
      const exists = await AddressModel.exists({ address_id });
      if (!exists) {
        throw new BadRequestError('Address not exists');
      }

      return AddressModel.deleteAddress(payload);
    } catch (error) {
      throw error;
    }
  }

  async createAddressBook(payload: Address) {
    try {
      const exists = await AddressModel.existsAddressBook(payload);
      if(exists) {
        throw new BadRequestError('Address already exists in the address book');
      }

      return await AddressModel.createAddressBook(payload);
    } catch (error) {
      throw error;
    }
  }
}

export default new AddressService();
