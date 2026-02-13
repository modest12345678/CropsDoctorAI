
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../shared/schema.js';

if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set - database features will not work');
}

const pool = process.env.DATABASE_URL
    ? new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Required for robust connection to Neon from local env
    })
    : null;

export const db = pool ? drizzle(pool, { schema }) : null;
