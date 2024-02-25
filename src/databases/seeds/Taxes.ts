import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('Taxes').del();

  const data = [
    {
        tax_name: 'VAT',
        tax_value: 0.1
    }
  ];

  // Inserts seed entries
  await knex('Taxes').insert(data);
}
