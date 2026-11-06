import { createDatabase } from '../db/client.js';

export default async function handler() {
  try {
    const { sql } = createDatabase();
    await sql`SELECT 1`;
    return Response.json({
      status: 'ok',
      service: 'ctrl-tech-api',
      database: 'connected',
      version: '0.1.0',
    });
  } catch (error) {
    const notConfigured = error instanceof Error && error.name === 'DatabaseConfigurationError';
    return Response.json(
      {
        status: 'error',
        service: 'ctrl-tech-api',
        database: notConfigured ? 'not_configured' : 'unavailable',
      },
      { status: 503 },
    );
  }
}
