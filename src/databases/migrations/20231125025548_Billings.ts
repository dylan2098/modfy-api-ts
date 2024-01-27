export async function up(knex) {
    return knex.schema
    .createTable('Billings', (table) => {
        table.increments('billingId').primary().unique();
        table.integer('orderId');
        table.string('customerNo', 100);
        table.string('customerEmail', 255).notNullable();
        table.string('firstName', 50).notNullable();
        table.string('lastName', 50).notNullable();
        table.string('phoneNumber', 20).notNullable();
        table.string('shippingAddress').notNullable();
        table.string('type', 10).notNullable();
        table.string('note');
    })
}

    
export async function down(knex) {
    return knex.schema
    .dropTable('Billings');
}