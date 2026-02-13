
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { analyzeCropDisease, calculateFertilizer } from '../server/openai.js';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../');
dotenv.config({ path: join(rootDir, '.env') });

async function testBackendLogic() {
    console.log("--- Testing Backend Logic ---");

    // TEST 1: Fertilizer Calculator (Text Model)
    console.log("\n🧪 Testing calculateFertilizer (Text Model)...");
    try {
        const fertResult = await calculateFertilizer("rice", 1, "bigha", "en");
        console.log("✅ Fertilizer Result:", JSON.stringify(fertResult, null, 2).slice(0, 200) + "...");
    } catch (error: any) {
        console.error("❌ Fertilizer Calc Failed:", error.message);
    }

    // TEST 2: Disease Detector (Vision Model)
    console.log("\n🧪 Testing analyzeCropDisease (Vision Model)...");
    try {
        const imagePath = join(rootDir, 'client/public/favicon.png');
        const imageBuffer = readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64Image}`;

        console.log(`Loaded image from ${imagePath}, size: ${base64Image.length} chars`);

        const diseaseResult = await analyzeCropDisease(dataUrl, "potato");
        console.log("✅ Disease Analysis Result:", JSON.stringify(diseaseResult, null, 2));

    } catch (error: any) {
        console.error("❌ Disease Analysis Failed:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        console.error("Message:", error.message);
    }
}

testBackendLogic();
