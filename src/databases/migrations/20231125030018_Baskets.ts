import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('Baskets', (table) => {
        table.uuid('basket_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('billing_id');
        table.integer('basket_total_items').notNullable(); // total items in basket
        table.float('basket_total_gross_price').notNullable();
        table.float('basket_total_net_price').notNullable();
        table.float('basket_total_tax_price').notNullable();
        table.smallint('basket_status').defaultTo(0);
        table.datetime('basket_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('BasketItems', (table) => {
        table.uuid('basket_item_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('basket_id').references('basket_id').inTable('Baskets');
        table.uuid('product_id').references('product_id').inTable('Products');
        table.integer('product_quantity').notNullable();
        table.float('product_net_price').notNullable();
        table.float('product_gross_price').notNullable();
        table.float('product_tax_price').notNullable();
    })
}

    
export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('BasketItems')
    .dropTable('Baskets')
    ;
}