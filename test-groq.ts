
import OpenAI from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

async function testGroq() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("No GROQ_API_KEY found in .env");
        return;
    }

    console.log(`Testing with API Key: ${apiKey.slice(0, 5)}...`);

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1"
    });

    // Test Text Model
    const textModel = "llama-3.3-70b-versatile";
    console.log(`Testing text model: ${textModel}...`);
    try {
        const textResponse = await client.chat.completions.create({
            model: textModel,
            messages: [{ role: "user", content: "Hello, are you working?" }],
        });
        console.log("Text model response:", textResponse.choices[0].message.content);
    } catch (error: any) {
        console.error(`Text model failed: ${error.message}`);
    }

    // Test Vision Model
    const visionModel = "llama-3.2-90b-vision-preview"; // Trying a known working request
    // The code uses "meta-llama/llama-4-scout-17b-16e-instruct", let's test that too
    const codeVisionModel = "meta-llama/llama-4-scout-17b-16e-instruct";

    console.log(`Testing vision model (from code): ${codeVisionModel}...`);
    try {
        const visionResponse = await client.chat.completions.create({
            model: codeVisionModel,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What is in this image?" },
                        { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg" } }
                    ]
                }
            ],
        });
        console.log("Vision model response:", visionResponse.choices[0].message.content);
    } catch (error: any) {
        console.error(`Vision model (${codeVisionModel}) failed: ${error.message}`);
    }
}

testGroq();
