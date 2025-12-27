import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });

export const development = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
