import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.increments('us_id').primary().unique();
      table.uuid('us_uuid').defaultTo(uuidv4());
      table.string('us_email', 100).notNullable();
      table.string('us_password', 255).notNullable();
      table.string('us_first_name', 50).notNullable();
      table.string('us_last_name', 50).notNullable();
      table.string('us_phone', 20).notNullable();
      table.smallint('us_gender');
      table.string('us_birthday');
      table.string('us_avtar');
      table.smallint('us_status').defaultTo(0);
      table.datetime('us_updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    })

    .createTable('Roles', (table) => {
      table.increments('role_id').primary().unique();
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
      table.integer('user_id').references('us_id').inTable('Users');
      table.integer('role_id').references('role_id').inTable('Roles');
    })

    .createTable('RoleMenu', (table) => {
      table.increments('role_menu_id').primary().unique();
      table.integer('role_id').references('role_id').inTable('Roles');
      table.integer('menu_id').references('menu_id').inTable('Menus');
    })

    .createTable('KeyTokens', (table) => {
      table.increments('key_token_id').primary().unique();
      table.integer('user_id').references('us_id').inTable('Users');
      table.string('refresh_token');
      table.string('private_key');
    })

    .createTable('Addresses', (table) => {
      table.increments('addressId').primary().unique();
      table.string('street');
      table.smallint('zipCode');
      table.string('city', 20);
      table.string('country', 50);
    })

    .createTable('AddressBooks', (table) => {
      table.increments('addressBookId');
      table.integer('customerId').references('customerId').inTable('Customers');
      table.integer('addressId').references('addressId').inTable('Addresses');
      table.boolean('selected').defaultTo(false);
    })

    .createTable('KeyTokens', (table) => {
      table.increments('userId').references('userId').inTable('Users');
      table.string('refreshToken');
      table.string('privateKey');
      table.string('publicKey');
      table.specificType('refreshTokenUsed', 'TEXT[]');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('KeyTokens')
    .dropTable('UsersSystem')
    .dropTable('Customers')
    .dropTable('AddressBooks')
    .dropTable('Addresses')
    .dropTable('Users');
}
