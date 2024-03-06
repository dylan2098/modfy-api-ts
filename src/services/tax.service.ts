import { STATUS } from '../core/status.core';
import { Tax } from '../core/types/product.type';
import TaxModel from '../models/tax.model';
import { BadRequestError } from '../utils/error.response';

class TaxService {
  async create(payload: Tax) {
    try {
      let { tax_name, tax_value } = payload;

      if (!tax_name || !tax_value) {
        throw new BadRequestError('Invalid data');
      }

      const exists = await TaxModel.exists({ tax_name });
      if (exists) {
        throw new BadRequestError('Tax exists');
      }

      const tax = await TaxModel.create(payload);
      if (!tax) {
        throw new BadRequestError('Create tax failed');
      }

      return tax;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return TaxModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Tax) {
    try {
      if (!payload || !payload.tax_id) {
        throw new BadRequestError('Update tax failed');
      }

      const { tax_id } = payload;

      const exists = await TaxModel.exists({ tax_id });
      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return TaxModel.update(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Tax) {
    try {
      if (!payload || !payload.tax_id) {
        throw new BadRequestError('Delete tax failed');
      }

      const { tax_id } = payload;

      const exists = await TaxModel.exists({ tax_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return TaxModel.update({ tax_id, tax_status: STATUS.INACTIVE });
    } catch (error) {
      throw error;
    }
  }
}

export default new TaxService();
