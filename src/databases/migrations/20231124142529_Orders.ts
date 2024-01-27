export async function up(knex) {
    return knex.schema
    .createTable('PaymentMethods', (table) => {
        table.increments('paymentMethodId').primary().unique();
        table.string('paymentMethodName').notNullable();
        table.smallint('status').defaultTo(0);
    })
    .createTable('Orders', (table) => {
        table.increments('orderId').primary().unique();
        table.uuid('orderNo').notNullable();
        table.float('totalGrossPrice').notNullable();
        table.float('totalNetPrice').notNullable();
        table.float('totalTaxPrice').notNullable();
        table.string('expectedDate', 20);
        table.string('cancelReason');
        table.smallint('orderStatus').defaultTo(0);
        table.datetime('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('PaymentTransactions', (table) => {
        table.increments('id').primary().unique();
        table.uuid('transactionId').notNullable();
        table.integer('orderId').references('orderId').inTable('Orders');
        table.integer('paymentMethodId').references('paymentMethodId').inTable('PaymentMethods');
        table.smallint('paymentStatus').defaultTo(0);
    })
    .createTable('OrderItems', (table) => {
        table.increments('orderItemId').primary().unique();
        table.integer('orderId').references('orderId').inTable('Orders');
        table.integer('productId').references('productId').inTable('Products');
        table.integer('quantity').notNullable();
        table.float('netPrice').notNullable();
        table.float('grossPrice').notNullable();
        table.float('taxPrice').notNullable();
    })
    .createTable('Shippings', (table) => {
        table.increments('shippingId').primary().unique();
        table.uuid('shippingNo').notNullable();
        table.integer('orderId').references('orderId').inTable('Orders');
        table.string('shippingMethod').notNullable();
        table.string('shipingCarrier').notNullable();
        table.string('trackingNumber').notNullable();
        table.datetime('shippingDate', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
}

    
export async function down(knex) {
    return knex.schema
    .dropTable('Shippings')
    .dropTable('OrderItems')
    .dropTable('PaymentTransactions')
    .dropTable('Orders')
    .dropTable('PaymentMethods')
    ;
}