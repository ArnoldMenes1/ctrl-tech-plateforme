import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

/** Create a request-scoped database client; DATABASE_URL remains server-only. */
export function createDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    const error = new Error('DATABASE_NOT_CONFIGURED');
    error.name = 'DatabaseConfigurationError';
    throw error;
  }
  const sql = neon(connectionString);
  return { sql, db: drizzle(sql) };
}
