import { STATUS } from '../core/status.core';
import { Product } from '../core/types/product.type';
import ProductModel from '../models/product.model';
import { BadRequestError } from '../utils/error.response';

class ProductService {
  async create(payload: Product) {
    try {
      if(!payload) {
        throw new BadRequestError('Invalid data');
      }

      const exists = await ProductModel.exists({ product_sku: payload.product_sku });
      if(exists) {
        throw new BadRequestError('Product exists');
      }

      const addProduct = await ProductModel.createProduct(payload);
      if(!addProduct || addProduct.length === 0) {
        throw new BadRequestError('Create product failed');
      }

      payload.product_id = addProduct[0].product_id;

      const addAttribute = ProductModel.createProductAttribute(payload);
      const addInventoryProduct = ProductModel.createInventoryProduct(payload);
      const addPrice = ProductModel.createPriceProduct(payload);

      await Promise.all([addAttribute, addInventoryProduct, addPrice].map(p => p.catch(e => e)));

      return addProduct;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return ProductModel.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getProduct(payload: Product) {
    try {
      return ProductModel.findOne(payload)
    } catch (error) {
      throw error;
    }
  }



  async update(payload: Product) {
    try {
      if(!payload || !payload.product_id) {
        throw new BadRequestError('Update product failed');
      }

      const { product_id } = payload;

      const exists = await ProductModel.exists({ product_id });
      if(!exists) {
        throw new BadRequestError('Product not exists');
      }

      return ProductModel.update(payload);
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Product) {
    try {
      if(!payload || !payload.product_id) {
        throw new BadRequestError('Delete product failed');
      }

      const { product_id } = payload;
      const exists = await ProductModel.exists({ product_id });
      if(!exists) {
        throw new BadRequestError('Product not exists');
      }

      return ProductModel.update({ product_id, product_status: STATUS.INACTIVE })
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
