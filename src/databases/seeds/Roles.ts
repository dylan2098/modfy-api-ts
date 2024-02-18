import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Roles').del();

  const data = [
    {
      role_name: 'admin',
      role_description: 'Using for all features',
      role_status: 1,
    },
    {
      role_name: 'customer',
      role_description: 'Using for store front with mode customer',
      role_status: 1,
    },
    {
      role_name: 'guest',
      role_description: 'Using for store front with mode guest',
      role_status: 1
    },
  ];

  // Inserts seed entries
  await knex('Roles').insert(data);
}
