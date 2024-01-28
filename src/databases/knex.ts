import knex, { Knex } from 'knex';
import knexCfg from '../configs/knex.config';

class Database {
  private instance: Knex | undefined; // Use Knex type from the import

  constructor() {
    this.connect();
  }

  connect() {
    this.instance = knex(knexCfg);

    // Check connection
    this.instance
      .raw('SELECT 1')
      .then(() => {
        console.log('PostgreSQL connected');
        return this.instance; // Return the instance for chaining
      })
      .catch((error: any) => {
        console.error(error);
        console.log('PostgreSQL not connected');
        throw error; // Rethrow to handle errors appropriately
      });

    return this.instance; // Add return statement
  }

  getInstance() {
    if (!this.instance) {
      return this.connect();
    }

    return this.instance; // Return existing instance
  }
}

export default new Database().getInstance();
