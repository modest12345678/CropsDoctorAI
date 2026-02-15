import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();
neonConfig.webSocketConstructor = ws;

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const client = await pool.connect();

    try {
        console.log('Adding user_ip columns to tables...');

        await client.query('ALTER TABLE detections ADD COLUMN IF NOT EXISTS user_ip varchar');
        console.log('✅ detections.user_ip added');

        await client.query('ALTER TABLE fertilizer_history ADD COLUMN IF NOT EXISTS user_ip varchar');
        console.log('✅ fertilizer_history.user_ip added');

        await client.query('ALTER TABLE soil_history ADD COLUMN IF NOT EXISTS user_ip varchar');
        console.log('✅ soil_history.user_ip added');

        console.log('\n🎉 All columns added successfully!');
    } catch (e: any) {
        console.error('❌ ERROR:', e.message);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
