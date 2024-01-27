export async function up(knex) {
    return knex.schema
    .createTable('GroupsConfig', (table) => {
        table.increments('groupConfigId').primary().unique();
        table.string('name');
    })
    .createTable('SitesConfig', (table) => {
        table.increments('siteConfigId').primary().unique();
        table.string('key').notNullable();
        table.string('name').notNullable();
    })
    .createTable('Services', (table) => {
        table.increments('serviceId').primary().unique();
        table.string('name').notNullable();
        table.string('host').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('port').notNullable();
        table.smallint('status').defaultTo(0);
    })
}

export async function down(knex) {
    return knex.schema
    .dropTable('Services')
    .dropTable('GroupsConfig')
    .dropTable('SitesConfig')
    ;
}