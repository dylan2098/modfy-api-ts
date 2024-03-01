import { STATUS } from '../core/status.core';
import { Catalog } from '../core/types/product.type';
import CatalogModel from '../models/catalog.model';
import { BadRequestError } from '../utils/error.response';

class CatalogService {
  async create(payload: Catalog) {
    try {
      let { catalog_name } = payload;

      if (!catalog_name) {
        throw new BadRequestError('Invalid data');
      }

      const exists = await CatalogModel.exists({ catalog_name });
      if (exists) {
        throw new BadRequestError('Tax exists');
      }

      const catalog = await CatalogModel.create(payload);
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
      return CatalogModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Catalog) {
    try {
      if (!payload || !payload.catalog_id) {
        throw new BadRequestError('Update tax failed');
      }

      const { catalog_id } = payload;

      const exists = await CatalogModel.exists({ catalog_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return CatalogModel.update(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Catalog) {
    try {
      if (!payload || !payload.catalog_id) {
        throw new BadRequestError('Delete tax failed');
      }

      const { catalog_id } = payload;

      const exists = await CatalogModel.exists({ catalog_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return CatalogModel.update({ catalog_id, catalog_status: STATUS.INACTIVE });
    } catch (error) {
      throw error;
    }
  }
}

export default new CatalogService();
