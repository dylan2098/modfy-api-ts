import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.uuid('user_uuid').primary().unique().defaultTo(knex.fn.uuid());
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
      table.index(['user_uuid', 'user_email', 'user_phone', 'user_first_name', 'user_last_name'], 'user_idx');
    })

    .createTable('Roles', (table) => {
      table.uuid('role_uuid').primary().unique().defaultTo(knex.fn.uuid());
      table.string('role_name');
      table.string('role_description');
      table.smallint('role_status').defaultTo(0);
    })

    .createTable('Menus', (table) => {
      table.uuid('menu_uuid').defaultTo(knex.fn.uuid()).primary().unique()
      table.string('menu_name');
      table.string('menu_path');
      table.smallint('menu_status').defaultTo(0);
    })

    .createTable('UserRole', (table) => {
      table.increments('user_role_id').primary().unique();
      table.uuid('user_uuid').references('user_uuid').inTable('Users');
      table.uuid('role_uuid').references('role_uuid').inTable('Roles');
      table.smallint('user_role_status').defaultTo(1);
    })

    .createTable('RoleMenu', (table) => {
      table.increments('role_menu_id').primary().unique();
      table.uuid('role_uuid').references('role_uuid').inTable('Roles');
      table.uuid('menu_uuid').references('menu_uuid').inTable('Menus');
      table.smallint('menu_role_status').defaultTo(1);
    })

    .createTable('KeyTokens', (table) => {
      table.increments('key_token_id').primary().unique();
      table.uuid('user_uuid').references('user_uuid').inTable('Users');
      table.string('refresh_token');
      table.string('private_key');
      table.string('public_key');
      table.specificType('refresh_token_used', 'text ARRAY');
      table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    })

    .createTable('Addresses', (table) => {
      table.uuid('address_uuid').primary().unique().defaultTo(knex.fn.uuid());
      table.string('address_street');
      table.string('address_zipcode');
      table.string('address_city', 40);
      table.string('address_country', 40);
      table.smallint('address_status').defaultTo(0);
    })

    .createTable('AddressBooks', (table) => {
      table.uuid('address_book_uuid').primary().unique().defaultTo(knex.fn.uuid());
      table.uuid('user_uuid').references('user_uuid').inTable('Users');
      table.uuid('address_uuid').references('address_uuid').inTable('Addresses');
      table.boolean('address_selected').defaultTo(false);
      table.smallint('address_book_status').defaultTo(0);
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
