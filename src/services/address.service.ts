import { Address } from '../core/types/access.type';
import AddressModel from '../models/address.model';
import {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  ForbiddenError,
} from '../utils/error.response';
import { ADDRESS_STATUS } from '../core/access/address.core';

class AddressService {
  create(payload: Address) {
    try {
      return AddressModel.create(payload);
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

      return AddressModel.update(payload);
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

      return AddressModel.delete(payload);
    } catch (error) {
      throw error;
    }
  }
}

export default new AddressService();
