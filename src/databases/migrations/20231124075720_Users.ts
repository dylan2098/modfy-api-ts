import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.uuid('user_id').primary().unique().defaultTo(knex.fn.uuid());
      table.string('user_email', 100).notNullable();
      table.string('user_password', 255).notNullable();
      table.string('user_first_name', 50).notNullable();
      table.string('user_last_name', 50).notNullable();
      table.string('user_phone', 20).notNullable();
      table.smallint('user_gender');
      table.string('user_birthday');
      table.string('user_avatar');
      table.smallint('user_status').defaultTo(0);
      table.datetime('user_created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.datetime('user_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.index(['user_id', 'user_email', 'user_phone', 'user_first_name', 'user_last_name'], 'user_index');
    })

    .createTable('Roles', (table) => {
      table.uuid('role_id').primary().unique().defaultTo(knex.fn.uuid());
      table.string('role_name');
      table.string('role_description');
      table.smallint('role_status').defaultTo(0);
    })

    .createTable('Menus', (table) => {
      table.uuid('menu_id').primary().unique().defaultTo(knex.fn.uuid());
      table.string('menu_name');
      table.string('menu_path');
      table.smallint('menu_status').defaultTo(0);
    })

    .createTable('UserRole', (table) => {
      table.increments('user_role_id').primary().unique();
      table.uuid('user_id').references('user_id').inTable('Users');
      table.uuid('role_id').references('role_id').inTable('Roles');
      table.smallint('user_role_status').defaultTo(1);
    })

    .createTable('RoleMenu', (table) => {
      table.increments('role_menu_id').primary().unique();
      table.uuid('role_id').references('role_id').inTable('Roles');
      table.uuid('menu_id').references('menu_id').inTable('Menus');
      table.smallint('menu_role_status').defaultTo(1);
    })

    .createTable('KeyTokens', (table) => {
      table.increments('key_token_id').primary().unique();
      table.uuid('user_id').references('user_id').inTable('Users');
      table.string('refresh_token');
      table.string('ip_address').notNullable();
      table.string('private_key');
      table.string('public_key');
      table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    })

    .createTable('Addresses', (table) => {
      table.uuid('address_id').primary().unique().defaultTo(knex.fn.uuid());
      table.string('customer_first_name');
      table.string('customer_last_name');
      table.string('address_phone');
      table.string('address_street');
      table.string('address_zipcode');
      table.string('address_city', 40);
      table.string('address_country', 40);
      table.string('address_state', 40);
      table.string('address_note', 255);
      table.smallint('address_status').defaultTo(0);
    })

    .createTable('AddressBooks', (table) => {
      table.uuid('address_book_id').primary().unique().defaultTo(knex.fn.uuid());
      table.uuid('user_id').references('user_id').inTable('Users');
      table.uuid('address_id').references('address_id').inTable('Addresses');
      table.boolean('address_selected').defaultTo(true);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('Roles')
    .dropTable('Menus')
    .dropTable('Addresses')
    .dropTable('Users')
    .dropTable('RoleMenu')
    .dropTable('UserRole')
    .dropTable('AddressBooks')
    .dropTable('KeyTokens')
    ;
}
