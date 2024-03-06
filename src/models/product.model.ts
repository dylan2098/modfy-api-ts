import table from '../databases/table';
import knex from '../databases/knex';
import { Product } from '../core/types/product.type';

class ProductModel {
  async findAll(): Promise<Product[]> {
    
  }

  async findOne(payload: Product) {
    
  }

  async exists(payload: Product) : Promise<boolean> {
    return false;
  }

  create(payload: Product): Promise<Product[]> {
    
  }

  update(payload: Product) {
    
  }
}

export default new ProductModel();
