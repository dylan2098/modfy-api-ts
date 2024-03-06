import table from '../databases/table';
import knex from '../databases/knex';
import { Product } from '../core/types/product.type';

class ProductModel {
  async findAll(): Promise<Product[]> {
    const columns = ['product_id', 'product_name', 'product_sku', 'product_price', 'product_status'];
    return knex.select(columns).from(table.products);
  }

  async findOne(payload: Product) {
    const { product_id, product_sku } = payload;
    const queryBuilder = knex.select('product_id').from(table.products).first();

    if (product_sku) {
      queryBuilder.where('product_sku', product_sku);
    }

    if (product_id) {
      queryBuilder.where('product_id', product_id);
    }

    return queryBuilder;
  }

  async exists(payload: Product) : Promise<boolean> {
    return false;
  }

  create(payload: Product): Promise<Product[]> {
    return knex(table.products).returning('product_id').insert(payload);
  }

  update(payload: Product) {
    return knex(table.products).where('product_id', payload.product_id).update(payload);
  }
}

export default new ProductModel();
