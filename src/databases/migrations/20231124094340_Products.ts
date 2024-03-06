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
    table.uuid('catalog_id').references('catalog_id').inTable('Catalogs');
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
    table.uuid('inventory_id').primary().unique().defaultTo(knex.fn.uuid());
    table.string('inventory_name', 100).notNullable();
    table.smallint('inventory_status').defaultTo(0);
  })

  .createTable('Products', (table) => {
    table.uuid('product_id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('category_id').references('category_id').inTable('Categories');
    table.string('product_sku', 50).notNullable();
    table.string('product_name').notNullable();
    table.boolean('product_allow_use_promotion').defaultTo(true);
    table.smallint('product_status').defaultTo(0);
    table.datetime('product_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.index(['product_id','category_id', 'product_sku', 'product_name'], 'product_index');
  })

  .createTable('InventoryProduct', (table) => {
    table.uuid('inventory_product_id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('inventory_id').references('inventory_id').inTable('Inventories');
    table.uuid('product_id').references('product_id').inTable('Products');
    table.integer('inventory_stock').defaultTo(0);
    table.integer('inventory_mode').defaultTo(0); // normal, pre-order, back-order
    table.datetime('inventory_expected_date');
    table.smallint('product_inventory_status').defaultTo(0); // available, out of stock
  })

  .createTable('ProductAttributes', (table) => {
    table.increments('attribute_id').primary().unique();
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
    table.uuid('price_id').primary().unique().defaultTo(knex.fn.uuid());
    table.uuid('product_id').references('product_id').inTable('Products');
    table.float('gross_price');
    table.float('net_price');
    table.uuid('tax_id');
    table.smallint('tax_status').defaultTo(0);
    table.foreign('tax_id').references('tax_id').inTable('Taxes');
  })

  .createTable('Sets', (table) => {
    table.uuid('product_set_id').primary().unique();
    table.uuid('master_id').references('product_id').inTable('Products');
    table.specificType('sets_id', 'text ARRAY') //'INT[]'
    table.smallint('sets_status').defaultTo(0);
  })

  .createTable('Variants', (table) => {
    table.uuid('product_variant_id').primary().unique();
    table.uuid('master_id').references('product_id').inTable('Products');
    table.specificType('variants_id', 'text ARRAY') //'INT[]'
    table.smallint('variants_status').defaultTo(0);
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('ProductAttributes')
    .dropTable('Prices')
    .dropTable('Sets')
    .dropTable('Variants')
    .dropTable('Taxes')
    .dropTable('Products')
    .dropTable('Categories')
    .dropTable('Inventories')
    .dropTable('Catalogs')
}