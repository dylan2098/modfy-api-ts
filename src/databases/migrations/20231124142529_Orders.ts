import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('PaymentMethods', (table) => {
        table.increments('payment_method_id').primary().unique();
        table.uuid('payment_method_id').notNullable();;
        table.string('payment_method_name').notNullable();
        table.smallint('payment_method_status').defaultTo(0);
    })
    .createTable('Orders', (table) => {
        table.increments('order_id').primary().unique();
        table.uuid('order_id').notNullable();
        table.float('order_total_gross_price').notNullable();
        table.float('order_total_net_price').notNullable();
        table.float('order_total_tax_price').notNullable();
        table.string('order_expected_date', 20);
        table.string('order_cancel_reason');
        table.smallint('order_status').defaultTo(0);
        table.datetime('order_created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime('order_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.index(['order_id'], 'idx_order');
    })
    .createTable('PaymentTransactions', (table) => {
        table.increments('payment_transaction_id').primary().unique();
        table.uuid('payment_transaction_id').notNullable();;
        table.uuid('order_transaction_id').notNullable();
        table.integer('order_id').references('order_id').inTable('Orders');
        table.integer('payment_method_id').references('payment_method_id').inTable('PaymentMethods');
        table.smallint('payment_status').defaultTo(0); // paid, not paid, refunded
    })
    .createTable('OrderItems', (table) => {
        table.increments('order_item_id').primary().unique();
        table.integer('order_id').references('order_id').inTable('Orders');
        table.integer('product_id').references('product_id').inTable('Products');
        table.integer('product_quantity').notNullable();
        table.float('product_net_price').notNullable();
        table.float('product_gross_price').notNullable();
        table.float('product_tax_price').notNullable();
    })
    .createTable('Shippings', (table) => {
        table.increments('shipping_id').primary().unique();
        table.uuid('shipping_id').notNullable();;
        table.integer('order_id').references('order_id').inTable('Orders');
        table.uuid('order_id');
        table.string('shipping_method').notNullable();
        table.string('shipping_carrier').notNullable();
        table.string('shipping_tracking_number').notNullable();
        table.datetime('shipping_date', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.smallint('shipping_status').defaultTo(0);
    })
}

    
export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('Shippings')
    .dropTable('OrderItems')
    .dropTable('PaymentTransactions')
    .dropTable('PaymentMethods')
    .dropTable('Orders')
    ;
}