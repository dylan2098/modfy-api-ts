import utils from '../utils/utils';
import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config({
  path: '../../.env',
});

const env = process.env;

interface KnexConfig {
  [key: string]: Knex.Config;
}

const config: KnexConfig = {
  development: {
    client: env.DEV_DB_CLIENT,
    connection: {
      host: env.DEV_DB_HOST,
      user: env.DEV_DB_USER,
      password: env.DEV_DB_PASS,
      database: env.DEV_DB_NAME,
      port: parseInt(env.DEV_DB_PORT || '5432'),
    },
    pool: {
      min: 2,
      max: parseInt(env.DEV_DB_POOL_MAX || '30'),
    },
    useNullAsDefault: true,
    debug: true,
  },
  production: {
    client: env.PROD_DB_CLIENT,
    connection: {
      host: env.PROD_DB_HOST,
      user: env.PROD_DB_USER,
      password: env.PROD_DB_PASS,
      database: env.PROD_DB_NAME,
      port: parseInt(env.PROD_DB_PORT || '5432'),
    },
    pool: {
      min: 2,
      max: parseInt(env.PROD_DB_POOL_MAX || '30'),
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config[utils.environment()];
