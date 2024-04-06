import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('Baskets', (table) => {
        table.uuid('basket_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('billing_id');
        table.uuid('shipping_id');
        table.uuid('payment_method_id');
        table.text('basket_items');
        table.datetime('basket_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    })
}

    
export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('Baskets')
    ;
}1