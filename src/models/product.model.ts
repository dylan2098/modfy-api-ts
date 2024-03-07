import table from '../databases/table';
import knex from '../databases/knex';
import { Product } from '../core/types/product.type';

class ProductModel {
  findAll(): Promise<Product[]> {
    const columns = [
      'Products.category_id',
      'Products.product_id',
      'InventoryProduct.inventory_id',
      'Products.product_name',
      'Products.product_sku',
      'Categories.category_name',
      'ProductAttributes.attribute_brand',
      'ProductAttributes.attribute_color',
      'ProductAttributes.attribute_size',
      'ProductAttributes.attribute_model',
      'ProductAttributes.attribute_type',
      'ProductAttributes.attribute_image',
      'ProductAttributes.attribute_images',
      'ProductAttributes.attribute_short_description',
      'ProductAttributes.attribute_long_description',
      'InventoryProduct.inventory_stock',
      'InventoryProduct.inventory_mode',
      'InventoryProduct.inventory_expected_date',
      'InventoryProduct.product_inventory_status',
      'Prices.gross_price',
      'Prices.net_price',
      'Prices.sale_price',
      'Taxes.tax_name',
      'Taxes.tax_value',
    ];

    return knex
      .select(columns)
      .from(table.products)
      .innerJoin('Categories', 'Products.category_id', 'Categories.category_id')
      .innerJoin('ProductAttributes', 'Products.product_id', 'ProductAttributes.product_id')
      .innerJoin('InventoryProduct', 'Products.product_id', 'InventoryProduct.product_id')
      .innerJoin('Prices', 'Products.product_id', 'Prices.product_id')
      .innerJoin('Taxes', 'Prices.tax_id', 'Taxes.tax_id');
  }

  async findOne(payload: Product) {
    const columns = [
      'Products.category_id',
      'Products.product_id',
      'InventoryProduct.inventory_id',
      'Products.product_name',
      'Products.product_sku',
      'Categories.category_name',
      'ProductAttributes.attribute_brand',
      'ProductAttributes.attribute_color',
      'ProductAttributes.attribute_size',
      'ProductAttributes.attribute_model',
      'ProductAttributes.attribute_type',
      'ProductAttributes.attribute_image',
      'ProductAttributes.attribute_images',
      'ProductAttributes.attribute_short_description',
      'ProductAttributes.attribute_long_description',
      'InventoryProduct.inventory_stock',
      'InventoryProduct.inventory_mode',
      'InventoryProduct.inventory_expected_date',
      'InventoryProduct.product_inventory_status',
      'Prices.gross_price',
      'Prices.net_price',
      'Prices.sale_price',
      'Taxes.tax_name',
      'Taxes.tax_value',
    ];

    const { product_id, product_sku } = payload;
    const queryBuilder = knex.select(columns).from(table.products).first();

    if (product_sku) {
      queryBuilder.where('product_sku', product_sku);
    }

    if (product_id) {
      queryBuilder.where('Products.product_id', product_id);
    }

    queryBuilder
      .innerJoin('Categories', 'Products.category_id', 'Categories.category_id')
      .innerJoin('ProductAttributes', 'Products.product_id', 'ProductAttributes.product_id')
      .innerJoin('InventoryProduct', 'Products.product_id', 'InventoryProduct.product_id')
      .innerJoin('Prices', 'Products.product_id', 'Prices.product_id')
      .innerJoin('Taxes', 'Prices.tax_id', 'Taxes.tax_id');

    return queryBuilder;
  }

  async exists(payload: Product): Promise<boolean> {
    const { product_id, product_sku } = payload;
    const queryBuilder = knex.select('product_id').from(table.products).first();

    if (product_sku) {
      queryBuilder.where('product_sku', product_sku);
    }

    if (product_id) {
      queryBuilder.where('product_id', product_id);
    }

    const result = await queryBuilder;

    if (result && result.length > 0) {
      return true;
    }

    return false;
  }

  createProduct(payload: Product): Promise<Product[]> {
    return knex(table.products).returning('product_id').insert({
      product_name: payload.product_name,
      product_sku: payload.product_sku,
      category_id: payload.category_id,
    });
  }

  createProductAttribute(payload: Product) {
    return knex(table.product_attributes).insert({
      product_id: payload.product_id,
      attribute_brand: payload.attribute_brand,
      attribute_color: payload.attribute_color,
      attribute_size: payload.attribute_size,
      attribute_model: payload.attribute_model,
      attribute_type: payload.attribute_type,
      attribute_image: payload.attribute_image,
      attribute_images: payload.attribute_images,
      attribute_short_description: payload.attribute_short_description,
      attribute_long_description: payload.attribute_long_description,
    });
  }

  createInventoryProduct(payload: Product) {
    return knex(table.inventory_product).insert({
      product_id: payload.product_id,
      inventory_id: payload.inventory_id,
      inventory_stock: payload.inventory_stock,
      inventory_mode: payload.inventory_mode,
      inventory_expected_date: payload.inventory_expected_date,
      product_inventory_status: payload.product_inventory_status,
    });
  }

  createPriceProduct(payload: Product) {
    return knex(table.prices).insert({
      product_id: payload.product_id,
      tax_id: payload.tax_id,
      gross_price: payload.gross_price,
      net_price: payload.net_price,
      sale_price: payload.sale_price,
    });
  }

  update(payload: Product) {
    return knex(table.products).where('product_id', payload.product_id).update(payload);
  }
}

export default new ProductModel();
