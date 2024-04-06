import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('PaymentMethods', (table) => {
        table.uuid('payment_method_id').primary().unique().defaultTo(knex.fn.uuid());
        table.string('payment_method_name').notNullable();
        table.smallint('payment_method_status').defaultTo(0);
    })
    .createTable('Orders', (table) => {
        table.uuid('order_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('order_transaction_id').notNullable();
        table.float('order_total_gross_price').notNullable();
        table.float('order_total_net_price').notNullable();
        table.float('order_total_tax_price').notNullable();
        table.string('order_expected_date', 20);
        table.string('order_cancel_reason');
        table.text('order_items');
        table.smallint('order_status').defaultTo(0);
        table.datetime('order_created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime('order_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.index(['order_id'], 'idx_order');
    })
    .createTable('PaymentTransactions', (table) => {
        table.uuid('payment_transaction_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('order_id');
        table.uuid('payment_method_id');
        table.smallint('payment_status').defaultTo(0); // paid, not paid, refunded
    })
    .createTable('Shippings', (table) => {
        table.uuid('shipping_id').primary().unique().defaultTo(knex.fn.uuid());
        table.string('shipping_method').notNullable();
        table.string('shipping_carrier').notNullable(); // hang van chuyen
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