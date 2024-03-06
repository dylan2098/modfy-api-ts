import { STATUS } from '../core/status.core';
import { Inventory } from '../core/types/product.type';
import InventoryModel from '../models/inventory.model';
import { BadRequestError } from '../utils/error.response';

class InventoryService {
  async create(payload: Inventory) {
    try {
      let { inventory_name } = payload;

      if (!inventory_name) {
        throw new BadRequestError('Invalid data');
      }

      const exists = await InventoryModel.exists({ inventory_name });
      if (exists) {
        throw new BadRequestError('Catalog exists');
      }

      const catalog = await InventoryModel.create(payload);
      if (!catalog) {
        throw new BadRequestError('Create catalog failed');
      }

      return catalog;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return InventoryModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Inventory) {
    try {
      if (!payload || !payload.inventory_id) {
        throw new BadRequestError('Update tax failed');
      }

      const { inventory_id } = payload;

      const exists = await InventoryModel.exists({ inventory_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return InventoryModel.update(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Inventory) {
    try {
      if (!payload || !payload.inventory_id) {
        throw new BadRequestError('Delete tax failed');
      }

      const { inventory_id } = payload;

      const exists = await InventoryModel.exists({ inventory_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return InventoryModel.update({ inventory_id, inventory_status: STATUS.INACTIVE });
    } catch (error) {
      throw error;
    }
  }
}

export default new InventoryService();
