import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('GroupConfig', (table) => {
        table.uuid('group_config_id').primary().unique().defaultTo(knex.fn.uuid());
        table.string('group_name').notNullable();
        table.smallint('group_status').defaultTo(0);
    })
    .createTable('Config', (table) => {
        table.uuid('config_id').primary().unique().defaultTo(knex.fn.uuid());
        table.uuid('group_config_id').references('group_config_id').inTable('GroupConfig');
        table.string('config_key').notNullable();
        table.string('config_name').notNullable();
        table.smallint('config_status').defaultTo(0);
    })
    .createTable('Services', (table) => {
        table.uuid('service_id').primary().unique().defaultTo(knex.fn.uuid());
        table.string('service_name').notNullable();
        table.string('service_host').notNullable();
        table.string('service_username').notNullable();
        table.string('service_password').notNullable();
        table.string('service_port').notNullable();
        table.smallint('service_status').defaultTo(0);
        table.index(['service_name'], 'service_idx');
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable('Services')
    .dropTable('Config')
    .dropTable('GroupConfig')
    ;
}