import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Catalogs', (table) => {
    table.uuid('catalog_id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('catalog_name', 100).notNullable();
    table.smallint('catalog_status').defaultTo(0);
    table.datetime('catalog_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  })

  .createTable('Categories', (table) => {
    table.uuid('category_id').primary().unique().defaultTo(knex.fn.uuid());
    table.integer('catalog_id').references('catalog_id').inTable('Catalogs');
    table.string('category_name', 100).notNullable();
    table.smallint('category_status').defaultTo(0);
    table.datetime('category_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.index(['category_id', 'category_name'], 'category_index');
  })

  .createTable('Taxes', (table) => {
    table.uuid('tax_id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('tax_name');
    table.float('tax_value');
    table.smallint('tax_status').defaultTo(0);
  })

  .createTable('Inventories', (table) => {
    table.increments('inventory_id').primary().unique().defaultTo(knex.fn.uuid());
    table.integer('inventory_stock').defaultTo(0);
    table.integer('inventory_mode').defaultTo(0); // normal, pre-order, back-order
    table.string('inventory_expected_date', 20);
    table.smallint('inventory_status').defaultTo(0); // available, out of stock
  })

  .createTable('Products', (table) => {
    table.increments('product_id').primary().unique().defaultTo(knex.fn.uuid());
    table.integer('category_id').references('category_id').inTable('Categories');
    table.integer('inventory_id').references('inventory_id').inTable('Inventories');
    table.string('product_sku', 20);
    table.string('product_name');
    table.boolean('product_allow_use_promotion').defaultTo(true);
    table.smallint('product_status').defaultTo(0);
    table.datetime('product_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.index(['product_id','category_id', 'product_sku', 'product_name'], 'product_index');
  })

  .createTable('ProductAttributes', (table) => {
    table.uuid('product_id').references('product_id').inTable('Products');
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
  
  .createTable('Prices', (table) => {
    table.uuid('product_id').references('product_id').inTable('Products');
    table.float('gross_price');
    table.float('net_price');
    table.integer('tax_id');
    table.smallint('tax_status').defaultTo(0);
    table.foreign('tax_id').references('tax_id').inTable('Taxes');
  })

  .createTable('Sets', (table) => {
    table.uuid('product_set_id').primary().unique();
    table.integer('master_id').references('product_id').inTable('Products');
    table.specificType('sets_id', 'integer ARRAY') //'INT[]'
    table.smallint('sets_status').defaultTo(0);
  })

  .createTable('Variants', (table) => {
    table.uuid('product_variant_id').primary().unique();
    table.integer('master_id').references('product_id').inTable('Products');
    table.specificType('variants_id', 'integer ARRAY') //'INT[]'
    table.smallint('variants_status').defaultTo(0);
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('ProductAttributes')
    .dropTable('Inventories')
    .dropTable('Prices')
    .dropTable('Sets')
    .dropTable('Variants')
    .dropTable('Taxes')
    .dropTable('Products')
    .dropTable('Catalogs')
    .dropTable('Categories')
}