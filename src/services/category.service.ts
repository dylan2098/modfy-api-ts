import { STATUS } from '../core/status.core';
import { Category } from '../core/types/product.type';
import CategoryModel from '../models/category.model';
import CatalogModel from '../models/catalog.model';
import { BadRequestError } from '../utils/error.response';

class CategoryService {
  async create(payload: Category) {
    try {
      let { category_name, catalog_id } = payload;

      if (!category_name || !catalog_id) {
        throw new BadRequestError('Invalid data');
      }

      const existsCatalog = await CatalogModel.exists({ catalog_id });
      if (!existsCatalog) {
        throw new BadRequestError('Catalog not exists');
      }

      const existsCatgory = await CategoryModel.exists({ category_name });
      if (existsCatgory) {
        throw new BadRequestError('Category exists');
      }

      const catalog = await CategoryModel.create(payload);
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
      return CategoryModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async update(payload: Category) {
    try {
      if (!payload || !payload.category_id) {
        throw new BadRequestError('Update tax failed');
      }

      const { category_id } = payload;

      const exists = await CategoryModel.exists({ category_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return CategoryModel.update(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Category) {
    try {
      if (!payload || !payload.category_id) {
        throw new BadRequestError('Delete tax failed');
      }

      const { category_id } = payload;

      const exists = await CategoryModel.exists({ category_id });

      if (!exists) {
        throw new BadRequestError('Tax not exists');
      }

      return CategoryModel.update({ category_id, category_status: STATUS.INACTIVE });
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
