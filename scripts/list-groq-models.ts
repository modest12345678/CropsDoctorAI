
import OpenAI from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

async function listModels() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("Error: GROQ_API_KEY is not set in .env file.");
        process.exit(1);
    }

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1"
    });

    try {
        console.log("Fetching available models from Groq...");
        const list = await client.models.list();

        console.log("\n--- Available Models ---");
        const visionModels = list.data.filter(m => m.id.includes('vision') || m.id.includes('llama-3.2') || m.id.includes('llama-4'));

        if (visionModels.length > 0) {
            console.log("\nPossible Vision Models:");
            visionModels.forEach(model => console.log(`- ${model.id}`));
        } else {
            console.log("\nNo obvious vision models found (checked for 'vision', 'llama-3.2', 'llama-4').");
        }

        console.log("\nAll Models:");
        list.data.forEach(model => console.log(`- ${model.id}`));

    } catch (error: any) {
        console.error("Failed to fetch models:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

listModels();
