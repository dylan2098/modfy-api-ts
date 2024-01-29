import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('Baskets', (table) => {
        table.increments('basket_id').primary().unique();
        table.uuid('basket_uuid').defaultTo(uuidv4());
        table.integer('billing_id').references('billing_id').inTable('Billings');
        table.integer('basket_total_items').notNullable(); // total items in basket
        table.float('basket_total_gross_price').notNullable();
        table.float('basket_total_net_price').notNullable();
        table.float('basket_total_tax_price').notNullable();
        table.datetime('basket_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('BasketItems', (table) => {
        table.increments('basket_item_id').primary().unique();
        table.integer('basket_id').references('basket_id').inTable('Baskets');
        table.integer('product_id').references('product_id').inTable('Products');
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