import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.increments('user_id').primary().unique();
      table.uuid('user_uuid').defaultTo(uuidv4());
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
      table.index(['user_uuid', 'user_email', 'user_phone', 'user_first_name', 'user_last_name', 'user_birthday'], 'user_idx');
    })

    .createTable('Roles', (table) => {
      table.increments('role_id').primary().unique();
      table.uuid('role_uuid').defaultTo(uuidv4());
      table.string('role_name');
      table.string('role_description');
    })

    .createTable('Menus', (table) => {
      table.increments('menu_id').primary().unique();
      table.uuid('menu_uuid').defaultTo(uuidv4());
      table.string('menu_name');
      table.string('menu_path');
    })

    .createTable('UserRole', (table) => {
      table.increments('user_role_id').primary().unique();
      table.integer('user_id').references('user_id').inTable('Users');
      table.integer('role_id').references('role_id').inTable('Roles');
    })

    .createTable('RoleMenu', (table) => {
      table.increments('role_menu_id').primary().unique();
      table.integer('role_id').references('role_id').inTable('Roles');
      table.integer('menu_id').references('menu_id').inTable('Menus');
    })

    .createTable('KeyTokens', (table) => {
      table.increments('key_token_id').primary().unique();
      table.integer('user_id').references('user_id').inTable('Users');
      table.string('refresh_token');
      table.string('private_key');
      table.string('public_key');
      table.specificType('refresh_token_used', 'text ARRAY');
      table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));

    })

    .createTable('Addresses', (table) => {
      table.increments('address_id').primary().unique();
      table.string('address_street');
      table.string('address_zipcode');
      table.string('address_city', 40);
      table.string('address_country', 40);
    })

    .createTable('AddressBooks', (table) => {
      table.increments('address_book_id').primary().unique();
      table.integer('user_id').references('user_id').inTable('Users');
      table.integer('address_id').references('address_id').inTable('Addresses');
      table.boolean('address_selected').defaultTo(false);
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
