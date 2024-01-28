import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Catalogs', (table) => {
    table.increments('catalog_id').primary().unique();
    table.uuid('catalog_uuid').defaultTo(uuidv4());
    table.string('catalog_name', 100).notNullable();
    table.smallint('catalog_status').defaultTo(0);
    table.datetime('catalog_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  })

  .createTable('Categories', (table) => {
    table.increments('category_id').primary().unique();
    table.uuid('category_uuid').defaultTo(uuidv4());
    table.integer('catalog_id').references('catalog_id').inTable('Catalogs');
    table.string('category_name', 100).notNullable();
    table.smallint('category_status').defaultTo(0);
    table.datetime('category_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.index(['category_uuid', 'category_name'], 'category_idx');
  })

  .createTable('Taxes', (table) => {
    table.increments('tax_id').primary().unique();
    table.string('tax_name');
    table.float('tax_value');
    table.smallint('tax_status').defaultTo(0);
  })

  .createTable('Products', (table) => {
    table.increments('product_id').primary().unique();
    table.uuid('product_uuid').defaultTo(uuidv4());
    table.integer('category_id').references('category_id').inTable('Categories');
    table.integer('inventory_id').references('inventory_id').inTable('Inventories');
    table.string('product_sku', 20);
    table.string('product_name');
    table.boolean('product_allow_use_promotion').defaultTo(true);
    table.integer('tax_id').references('tax_id').inTable('Taxes');
    table.smallint('product_status').defaultTo(0);
    table.datetime('product_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.index(['product_uuid','category_id', 'product_sku', 'product_name'], 'product_idx');
  })

  .createTable('ProductAttributes', (table) => {
    table.increments('product_id').references('product_id').inTable('Products');
    table.string('attribute_brand', 50);
    table.string('attribute_color', 50);
    table.string('attribute_size', 50);
    table.string('attribute_model', 50);
    table.string('attribute_type', 10).defaultTo('normal');
    table.string('attribute_image');
    table.string('attribute_images', 50);
    table.string('attribute_short_description');
    table.string('attribute_long_description');
  })

  .createTable('Inventories', (table) => {
    table.increments('inventory_id').primary().unique();
    table.integer('inventory_stock').defaultTo(0);
    table.integer('inventory_mode').defaultTo(0); // normal, pre-order, back-order
    table.string('inventory_expected_date', 20);
    table.smallint('inventory_status').defaultTo(0); // available, out of stock
  })

  .createTable('ProductPrices', (table) => {
    table.increments('product_id').references('product_id').inTable('Products');
    table.float('product_gross_price');
    table.float('product_net_price');
    table.float('tax_id').references('tax_id').inTable('Taxes');
  })

  .createTable('Sets', (table) => {
    table.increments('product_set_id').primary().unique();
    table.integer('master_id').references('productId').inTable('Products');
    table.specificType('sets_id', 'integer ARRAY') //'INT[]'
  })

  .createTable('Variants', (table) => {
    table.increments('product_variant_id').primary().unique();
    table.integer('master_id').references('productId').inTable('Products');
    table.specificType('variants_id', 'integer ARRAY') //'INT[]'
  })
  ;
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('ProductAttributes')
    .dropTable('ProductPrices')
    .dropTable('ProductInventories')
    .dropTable('ProductSets')
    .dropTable('Variants')
    .dropTable('Products')
    .dropTable('Categories')
    .dropTable('Catalogs')
    .dropTable('Tax');
}