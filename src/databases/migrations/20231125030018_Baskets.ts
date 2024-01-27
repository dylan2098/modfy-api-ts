export async function up(knex) {
    return knex.schema
    .createTable('Baskets', (table) => {
        table.increments('basketId').primary().unique();
        table.integer('billingId');
        table.integer('totalItems').notNullable();
        table.float('totalGrossPrice').notNullable();
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('BasketItems', (table) => {
        table.increments('basketItemId').primary().unique();;
        table.integer('basketId').references('basketId').inTable('Baskets');
        table.integer('productId').notNullable();
        table.integer('quantity').notNullable();
        table.float('netPrice').notNullable();
        table.float('grossPrice').notNullable();
        table.float('taxPrice').notNullable();
    })
}

    
export async function down(knex) {
    return knex.schema
    .dropTable('Baskets')
    .dropTable('BasketItems')
    ;
}