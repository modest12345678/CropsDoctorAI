
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

async function testDbWrite() {
    console.log("--- Testing DB Write (createDetection) ---");

    // Dynamic import AFTER env is loaded
    const { db } = await import('../server/db.js');
    const { detections } = await import('../shared/schema.js');

    if (!db) {
        console.error("❌ DB not configured in server/db.ts");
        return;
    }

    try {
        const mockDetection = {
            cropType: "test-crop",
            imageData: "data:image/png;base64,check",
            diseaseName: "Test Disease",
            confidence: 100,
            description: "Test description",
            symptoms: "Test symptoms",
            treatment: JSON.stringify(["Test treatment"]),
        };

        console.log("Inserting mock detection...");

        // Using Drizzle directly (simulating storage.createDetection)
        const [result] = await db.insert(detections).values(mockDetection).returning();

        console.log("✅ DB Write Successful!");
        console.log("Inserted ID:", result.id);

    } catch (err: any) {
        console.error("❌ DB Write Failed:", err);
        console.error("Message:", err.message);
    } finally {
        process.exit(0);
    }
}

testDbWrite();
