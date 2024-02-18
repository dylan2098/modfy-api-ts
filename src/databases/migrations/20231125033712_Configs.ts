import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('GroupConfig', (table) => {
        table.increments('group_config_id').primary().unique();
        table.string('group_name').notNullable();
        table.smallint('group_status').defaultTo(0);
    })
    .createTable('Config', (table) => {
        table.increments('config_id').primary().unique();
        table.integer('group_config_id').references('group_config_id').inTable('GroupConfig');
        table.string('config_key').notNullable();
        table.string('config_name').notNullable();
        table.smallint('config_status').defaultTo(0);
    })
    .createTable('Services', (table) => {
        table.increments('service_id').primary().unique();
        table.uuid('service_id').notNullable();;
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