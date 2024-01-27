export async function up(knex) {
    return knex.schema
    .createTable('Users', (table) => {
        table.increments('userId').primary().unique();
        table.string('email', 100).notNullable();
        table.string('password', 255).notNullable();
        table.string('firstName', 50).notNullable();
        table.string('lastName', 50).notNullable();
        table.string('phoneNumber', 20).notNullable();
        table.string('refreshToken');
        table.specificType('roles', 'text ARRAY').notNullable();
        table.smallint('status').defaultTo(0);
        table.datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    })
    .createTable('Customers', (table) => {
        table.increments('customerId').references('userId').inTable('Users');
        table.string('customerNo');
        table.smallint('gender');
        table.string('birthday', 20);
        table.string('avatar')
    })
    .createTable('Addresses', (table) => {
        table.increments('addressId').primary().unique();;
        table.string('street')
        table.smallint('zipCode');
        table.string('city', 20);
        table.string('country', 50);
    })
    .createTable('AddressBooks', (table) => {
        table.increments('addressBookId');
        table.integer('customerId').references('customerId').inTable('Customers');
        table.integer('addressId').references('addressId').inTable('Addresses')
        table.boolean('selected').defaultTo(false);
    })
    .createTable('KeyTokens', (table) => {
        table.increments('userId').references('userId').inTable('Users');
        table.string('refreshToken');
        table.string('privateKey');
        table.string('publicKey');
        table.specificType('refreshTokenUsed', 'TEXT[]');
    })
}

    
export async function down(knex) {
    return knex.schema
    .dropTable('KeyTokens')
    .dropTable('UsersSystem')
    .dropTable('Customers')
    .dropTable('AddressBooks')
    .dropTable('Addresses')
    .dropTable('Users')
    ;
}