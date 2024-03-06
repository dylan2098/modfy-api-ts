import { STATUS } from '../core/status.core';
import { Product } from '../core/types/product.type';
import ProductModel from '../models/product.model';
import { BadRequestError } from '../utils/error.response';

class ProductService {
  async create(payload: Product) {
    try {
     
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

  async update(payload: Product) {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  async delete(payload: Product) {
    try {
      
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
