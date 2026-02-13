
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';
const { Pool } = pg;

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

async function testDbConnection() {
    console.log("--- Testing DB Connection ---");

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("❌ DATABASE_URL not found in .env");
        return;
    }

    console.log(`Connecting to DB: ${connectionString.slice(0, 20)}...`);

    const pool = new Pool({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false } // Required for Neon sometimes
    });

    try {
        const client = await pool.connect();
        console.log("✅ DB Connection successful!");

        const res = await client.query('SELECT NOW()');
        console.log("🕒 DB Time:", res.rows[0].now);

        client.release();
    } catch (err: any) {
        console.error("❌ DB Connection failed:", err.message);
    } finally {
        await pool.end();
    }
}

testDbConnection();
