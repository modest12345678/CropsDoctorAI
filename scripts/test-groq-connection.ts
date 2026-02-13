
import OpenAI from "openai";
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

async function testGroqConnection() {
    console.log("--- Testing Groq Connection ---");

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("❌ GROQ_API_KEY not found in .env");
        return;
    }

    console.log(`🔑 API Key found: ${apiKey.slice(0, 5)}...${apiKey.slice(-4)}`);

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1"
    });

    // Test 1: List Models
    console.log("\n📡 Fetching available models...");
    try {
        const models = await client.models.list();
        console.log(`✅ Connection success! Found ${models.data.length} models.`);
        const modelIds = models.data.map(m => m.id);
        console.log("Available models:", modelIds.join(", "));

        // Check specific models used in app
        const textModel = "llama-3.3-70b-versatile";
        const visionModel = "meta-llama/llama-4-scout-17b-16e-instruct"; // This looks suspicious, maybe deprecated?

        console.log(`\n🧐 Checking app models:`);
        console.log(`   - Text (${textModel}): ${modelIds.includes(textModel) ? "✅ Available" : "❌ NOT FOUND"}`);
        console.log(`   - Vision (${visionModel}): ${modelIds.includes(visionModel) ? "✅ Available" : "❌ NOT FOUND"}`);

    } catch (error: any) {
        console.error("❌ Failed to connect/list models:", error.message);
        if (error.status === 401) console.error("   -> Invalid API Key");
        return;
    }

    // Test 2: Text Completion
    console.log("\n💬 Testing Text Completion...");
    try {
        const textResponse = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: "Say 'Hello' if you can hear me." }],
        });
        console.log(`✅ Text Response: "${textResponse.choices[0].message.content}"`);
    } catch (error: any) {
        console.error("❌ Text completion failed:", error.message);
    }
}

testGroqConnection();
