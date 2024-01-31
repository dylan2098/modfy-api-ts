import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('Billings', (table) => {
        table.increments('billing_id').primary().unique();
        table.uuid('billing_uuid').notNullable();;
        table.integer('order_id');
        table.string('customer_uuid', 100);
        table.string('customer_email', 255).notNullable();
        table.string('customer_first_name', 50).notNullable();
        table.string('customer_last_name', 50).notNullable();
        table.string('customer_phone', 20).notNullable();
        table.string('customer_shipping_address').notNullable();
        table.string('billing_type', 10).notNullable(); // basket, order
        table.smallint('billing_status').defaultTo(0);
        table.string('customer_note');
    })
}

    
export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('Billings');
}