import OpenAI from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

// Initialize Groq client (using OpenAI SDK compatibility)
let groqClient: OpenAI | null = null;

function getGroqClient() {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set in environment variables");
    }
    groqClient = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1"
    });
  }
  return groqClient;
}

// Helper to get the model name - using Groq's available models
function getModel(type: "vision" | "text" = "text") {
  // For vision tasks, use llama-3.2-11b-vision-preview (active model)
  // For text tasks, use llama-3.3-70b-versatile (faster, good for text)
  if (type === "vision") {
    return "llama-3.2-11b-vision-preview";
  }
  return "llama-3.3-70b-versatile";
}

export interface DiseaseAnalysis {
  diseaseName: string;
  confidence: number;
  description: string;
  symptoms: string;
  treatment: string[];
}

export type CropType = "potato" | "tomato" | "corn" | "wheat" | "rice" | "jute" | "sugarcane" | "tea" | "mustard" | "mango" | "banana" | "brinjal" | "chili" | "onion" | "garlic" | "ginger" | "turmeric" | "lentil" | "watermelon" | "papaya" | "pineapple";

const cropDiseaseInfo: Record<CropType, { diseases: string[]; specialization: string }> = {
  potato: {
    diseases: ["Early Blight", "Late Blight", "Black Scurf", "Common Scab", "PLRV (Potato Leafroll Virus)", "PVY (Potato Virus Y)", "Mosaic Virus", "Blackleg", "Healthy"],
    specialization: "potato pathology"
  },
  tomato: {
    diseases: ["Bacterial Spot", "Early Blight", "Late Blight", "Leaf Mold", "Septoria Leaf Spot", "Spider Mites", "Target Spot", "Yellow Leaf Curl Virus", "Mosaic Virus", "Healthy"],
    specialization: "tomato diseases"
  },
  corn: {
    diseases: ["Common Rust", "Gray Leaf Spot", "Northern Leaf Blight", "Southern Leaf Blight", "Maize Dwarf Mosaic Virus", "Sugarcane Mosaic Virus", "Corn Smut", "Healthy"],
    specialization: "corn pathology"
  },
  wheat: {
    diseases: ["Leaf Rust", "Powdery Mildew", "Septoria", "Stripe Rust", "Stem Rust", "Wheat Streak Mosaic Virus", "Barley Yellow Dwarf Virus", "Fusarium Head Blight", "Healthy"],
    specialization: "cereal crop diseases"
  },
  rice: {
    diseases: ["Bacterial Leaf Blight", "Brown Spot", "Leaf Smut", "Blast", "Tungro", "Rice Yellow Mottle Virus", "Grassy Stunt Virus", "Sheath Blight", "Healthy"],
    specialization: "rice pathology"
  },
  jute: {
    diseases: ["Stem Rot", "Anthracnose", "Black Band", "Mosaic Virus", "Yellow Mosaic Virus", "Root Rot", "Collar Rot", "Healthy"],
    specialization: "fiber crop diseases"
  },
  sugarcane: {
    diseases: ["Red Rot", "Smut", "Wilt", "Grassy Shoot", "Mosaic Virus", "Yellow Leaf Virus", "Rust", "Leaf Scald", "Healthy"],
    specialization: "sugarcane pathology"
  },
  tea: {
    diseases: ["Blister Blight", "Red Rust", "Grey Blight", "Black Rot", "Brown Blight", "Die Back", "Root Rot", "Healthy"],
    specialization: "tea plantation diseases"
  },
  mustard: {
    diseases: ["Alternaria Blight", "White Rust", "Downy Mildew", "Powdery Mildew", "Sclerotinia Rot", "Mosaic Virus", "Black Spot", "Healthy"],
    specialization: "oilseed crop diseases"
  },
  mango: {
    diseases: ["Anthracnose", "Powdery Mildew", "Die Back", "Phoma Blight", "Mango Malformation", "Bacterial Canker", "Sooty Mold", "Healthy"],
    specialization: "fruit tree pathology"
  },
  banana: {
    diseases: ["Panama Wilt", "Sigatoka", "Bunchy Top Virus", "Anthracnose", "Banana Streak Virus", "Banana Mosaic Virus", "Moko Disease", "Healthy"],
    specialization: "banana diseases"
  },
  brinjal: {
    diseases: ["Phomopsis Blight", "Little Leaf", "Fruit Rot", "Wilt", "Bacterial Wilt", "Mosaic Virus", "Leaf Spot", "Healthy"],
    specialization: "vegetable pathology"
  },
  chili: {
    diseases: ["Anthracnose", "Leaf Curl Virus", "Powdery Mildew", "Wilt", "Chili Veinal Mottle Virus", "Tobacco Mosaic Virus", "Bacterial Spot", "Healthy"],
    specialization: "spice crop diseases"
  },
  onion: {
    diseases: ["Purple Blotch", "Downy Mildew", "Smut", "Neck Rot", "Basal Rot", "Stemphylium Blight", "Pink Root", "Healthy"],
    specialization: "bulb crop diseases"
  },
  garlic: {
    diseases: ["Purple Blotch", "Downy Mildew", "White Rot", "Rust", "Fusarium Basal Rot", "Penicillium Decay", "Mosaic Virus", "Healthy"],
    specialization: "bulb crop diseases"
  },
  ginger: {
    diseases: ["Soft Rot", "Leaf Spot", "Bacterial Wilt", "Yellows", "Rhizome Rot", "Phyllosticta Leaf Spot", "Mosaic Virus", "Healthy"],
    specialization: "rhizome diseases"
  },
  turmeric: {
    diseases: ["Leaf Spot", "Leaf Blotch", "Rhizome Rot", "Taphrina Leaf Spot", "Scale Rot", "Dry Rot", "Mosaic Virus", "Healthy"],
    specialization: "rhizome diseases"
  },
  lentil: {
    diseases: ["Wilt", "Rust", "Blight", "Root Rot", "Ascochyta Blight", "Stemphylium Blight", "Mosaic Virus", "Healthy"],
    specialization: "pulse crop diseases"
  },
  watermelon: {
    diseases: ["Anthracnose", "Downy Mildew", "Powdery Mildew", "Fusarium Wilt", "Cucumber Mosaic Virus", "Watermelon Mosaic Virus", "Zucchini Yellow Mosaic Virus", "Gummy Stem Blight", "Healthy"],
    specialization: "cucurbit diseases"
  },
  papaya: {
    diseases: ["Leaf Curl", "Ring Spot Virus", "Anthracnose", "Powdery Mildew", "Papaya Mosaic Virus", "Phytophthora Blight", "Damping Off", "Healthy"],
    specialization: "fruit pathology"
  },
  pineapple: {
    diseases: ["Heart Rot", "Mealybug Wilt", "Fruitlet Core Rot", "Black Rot", "Pink Disease", "Root Rot", "Leaf Spot", "Healthy"],
    specialization: "tropical fruit diseases"
  }
};

export async function analyzeCropDisease(
  base64Image: string,
  cropType: CropType,
  language: "en" | "bn" = "en"
): Promise<DiseaseAnalysis> {
  try {
    const client = getGroqClient();
    const model = getModel("vision");

    const cropInfo = cropDiseaseInfo[cropType];
    const diseaseList = cropInfo.diseases.map(disease => `- ${disease}`).join('\n');

    const languageInstruction = language === "bn"
      ? "Provide all responses in Bengali (বাংলা) language. Use very natural, fluent, and encouraging farmer-friendly language."
      : "Provide all responses in English language. Use very natural, fluent, and encouraging farmer-friendly language.";

    const prompt = `You are an expert agricultural pathologist specializing in ${cropInfo.specialization}. 
    
${languageInstruction}

A farmer has uploaded an image of their ${cropType} plant and suspects it may have a disease.

Common ${cropType} diseases include:
${diseaseList}

**CRITICAL ANALYSIS INSTRUCTIONS:**

1. **If the plant appears HEALTHY** (vibrant green, no visible lesions, normal growth):
   - Return diseaseName: "Healthy" or "No Disease Detected"
   - Set confidence: 85-95
   - Description: "Your ${cropType} plant appears healthy with no visible disease symptoms!"
   - Symptoms: "No disease symptoms observed. Plant shows normal, healthy growth."
   - Treatment: Provide PREVENTIVE care tips (proper watering, nutrition, monitoring)

2. **If the image is POOR QUALITY** (blurry, too dark, plant not clearly visible):
   - Return diseaseName: "Image Quality Issue"
   - Set confidence: 20-40
   - Description: "Cannot analyze reliably - image quality is insufficient for accurate diagnosis"
   - Symptoms: "Image too blurry/dark to detect symptoms clearly"
   - Treatment: ["Please retake photo with: bright natural lighting, close-up of affected area, clear focus, plant filling most of frame"]

3. **If UNCERTAIN** (symptoms not matching known diseases clearly):
   - Return best guess OR "Unknown Disease"
   - Set confidence: 30-60 (reflect actual uncertainty)
   - Description: "AI is uncertain. Please consult an agricultural expert for confirmation."
   - Include disclaimer about need for professional verification

4. **ONLY if symptoms are CLEAR and CONFIDENT**:
   - Return specific disease name
   - Set confidence: 70-95 (based on symptom clarity)
   - Provide detailed symptoms and treatment steps

**Response Format (JSON only, no markdown):**
{
  "diseaseName": "Specific disease name OR 'Healthy' OR 'Image Quality Issue' OR 'Unknown Disease'",
  "confidence": 20-95,
  "description": "Brief, honest, farmer-friendly description",
  "symptoms": "Key visible symptoms OR 'No symptoms' OR 'Cannot see clearly'",
  "treatment": [
    "Step 1: Preparation - ...",
    "Step 2: Medicine Selection - Use [Product Name]...",
    "Step 3: How to Apply - Mix Xg in Y liters of water. Spray thoroughly...",
    "Step 4: Schedule - Apply every 7 days..."
  ]
}

**IMPORTANT RULES:**
- Be HONEST about uncertainty - don't force diagnoses
- DON'T diagnose disease on obviously healthy plants
- DON'T guess wildly on unclear/blurry images
- Confidence should reflect ACTUAL certainty, not optimism
- Treatment must be ARRAY of detailed, farmer-friendly steps
- Use natural, encouraging language`;

    // Process base64 image
    let imageUrl = base64Image;
    if (!base64Image.startsWith("data:")) {
      imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }

    const response = await client.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content || "{}";

    let parsedResult: any;
    try {
      parsedResult = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Failed to parse AI response");
    }

    // Ensure treatment is an array
    const treatmentArray = Array.isArray(parsedResult.treatment)
      ? parsedResult.treatment
      : [parsedResult.treatment || "Consult an expert."];

    return {
      diseaseName: parsedResult.diseaseName || "Unknown Disease",
      confidence: Math.max(1, Math.min(100, Math.round(parsedResult.confidence || 70))),
      description: parsedResult.description || "Disease analysis completed",
      symptoms: parsedResult.symptoms || "Unable to determine specific symptoms",
      treatment: treatmentArray,
    };
  } catch (error: any) {
    console.error(`Error analyzing ${cropType} disease:`, error);
    throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function analyzePotatoDisease(base64Image: string): Promise<DiseaseAnalysis> {
  return analyzeCropDisease(base64Image, "potato");
}

export async function chatWithAI(message: string, language: "en" | "bn" = "en"): Promise<{ response: string }> {
  try {
    const client = getGroqClient();
    const model = getModel("text");

    const languageInstruction = language === "bn"
      ? "The user's interface is in Bengali. You MUST reply in Bengali (বাংলা) unless explicitly asked to speak English."
      : "The user's interface is in English. However, if the user asks a question in Bengali (or asks to speak in Bengali), you MUST switch to Bengali immediately and reply in Bengali. Do not refuse to speak Bengali.";

    const prompt = `You are 'Crop Doctor AI', an expert agricultural consultant fluent in both English and Bengali (Bangla).
${languageInstruction}

**YOUR STRICT ROLE:**
You are EXCLUSIVELY an agricultural assistant. You ONLY answer questions about:
- Crops and farming
- Plant diseases and pests
- Soil and fertilizers
- Irrigation and water management
- Agricultural techniques and best practices
- Farm equipment and tools
- Weather impact on farming
- Crop calendar and planting schedules
- Organic farming
- Agricultural economics (crop prices, farm management)

**WHAT YOU MUST DECLINE:**
You MUST politely decline and REFUSE to answer questions about:
- Politics, news, current events
- Entertainment, celebrities, movies, sports
- Technology (unless farm-related)
- Coding, programming, software
- Math homework, school assignments (unless agricultural calculations)
- Personal advice, relationships, health (unless agricultural worker safety)
- General knowledge, trivia
- ANY topic not directly related to agriculture or farming

**LANGUAGE RULES:**
- You are fully capable of speaking Bengali (Bangla). NEVER say you cannot speak Bangla.
- If the user writes in Bengali, reply in Bengali.
- If the user writes in English, reply in English.
- If the user asks if you can speak Bengali, say YES in Bengali.

**RESPONSE FORMAT:**

For FARMING questions:
- Provide helpful, accurate, farmer-friendly advice
- Keep responses concise and practical
- Use simple language that farmers understand

For NON-FARMING questions:
Reply EXACTLY like this:
English: "I'm Crop Doctor AI, specialized in agriculture and farming. I can only help with farming-related questions. Please ask me about crops, diseases, soil, fertilizers, or any farming topic!"
Bengali: "আমি ক্রপ ডক্টর এআই, কৃষি এবং চাষাবাদ বিশেষজ্ঞ। আমি শুধুমাত্র কৃষি সম্পর্কিত প্রশ্নের উত্তর দিতে পারি। অনুগ্রহ করে ফসল, রোগ, মাটি, সার বা যেকোনো কৃষি বিষয়ে জিজ্ঞাসা করুন!"

User Question: ${message}

Analyze if this is farming-related. If YES, answer helpfully. If NO, politely decline using the exact template above.`;

    const response = await client.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response at this time.";

    return { response: text };
  } catch (error: any) {
    console.error("Error in chatWithAI:", error);
    throw new Error(`Failed to get chat response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export interface FertilizerRecommendation {
  cropName: string;
  area: number;
  unit: string;
  recommendations: string[];
  organicOptions: string[];
  perUnitList: string[];
}

// Helper function to convert English numbers to Bengali
function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
}

// Helper function to convert Bengali numbers to English
function toEnglishNumber(text: string): string {
  const bengaliToEnglish: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  return text.replace(/[০-৯]/g, (digit) => bengaliToEnglish[digit]);
}

// Helper function to format fertilizer text (convert numbers to Bengali)
function formatFertilizerText(content: string | string[], language: "en" | "bn"): string | string[] {
  const processText = (text: string) => {
    // Match patterns like "50 kg", "৫০ কেজি", "50kg", "2000.50 kg"
    const pattern = /([\d০-৯]+(?:[.\.][\d০-৯]+)?)\s*(kg|কেজি|কিলোগ্রাম)/gi;

    return text.replace(pattern, (match, amount, unit) => {
      // Just ensure the number is in the correct language format
      const englishAmount = toEnglishNumber(amount);
      const displayAmount = language === "bn" ? toBengaliNumber(englishAmount) : englishAmount;
      return `${displayAmount} ${unit}`;
    });
  };

  if (Array.isArray(content)) {
    return content.map(processText);
  }
  return processText(content);
}

export async function calculateFertilizer(
  cropType: CropType,
  area: number,
  unit: "acre" | "bigha",
  language: "en" | "bn" = "en"
): Promise<FertilizerRecommendation> {
  try {
    const client = getGroqClient();
    const model = getModel("text");

    // Convert bigha to acres for consistency (1 bigha ≈ 0.33 acres)
    const areaInAcres = unit === "bigha" ? area * 0.33 : area;

    const cropInfo = cropDiseaseInfo[cropType];
    const languageInstruction = language === "bn"
      ? "Provide all responses in Bengali (বাংলা) language. Use very natural, fluent, and encouraging farmer-friendly language."
      : "Provide all responses in English language. Use very natural, fluent, and encouraging farmer-friendly language.";

    const prompt = `You are an expert agricultural consultant specializing in ${cropInfo.specialization} in Bangladesh.

${languageInstruction}

The farmer wants to cultivate ${cropType} on ${area} ${unit} (approximately ${areaInAcres.toFixed(2)} acres).

CRITICAL INSTRUCTION: Provide TOTAL amounts for the ENTIRE ${area} ${unit} area directly. Do NOT provide per-unit amounts in the recommendations.
For example, if the recommendation is 50 kg Urea per acre for 2 acres, state "100 kg Urea", not "50 kg Urea per acre".

Provide JSON with:
{
  "cropName": "crop name in specified language",
  "area": ${area},
  "unit": "${unit}",
  "recommendations": [
    "Step 1: Land Preparation (Day 0) - Apply X kg Urea, Y kg TSP... Mix well with soil during final ploughing.",
    "Step 2: First Top Dressing (Day 15-20) - Apply X kg Urea... Apply when soil has moisture.",
    "Step 3: Second Top Dressing (Day 35-40)..."
  ],
  "organicOptions": [
    "Cow Dung: Apply X kg during land preparation...",
    "Compost: Apply Y kg..."
  ],
  "perUnitList": [
    "Urea: X kg per ${unit}",
    "TSP: Y kg per ${unit}",
    "MoP: Z kg per ${unit}"
  ]
}

IMPORTANT:
- MERGE the application schedule INTO the recommendations steps. Do not create a separate schedule section.
- Each recommendation step MUST include the TIMING (e.g., "Day 0", "Day 20").
- Be very descriptive, fluent, and helpful. Explain WHY and HOW to apply in a way a farmer would understand easily.
- All fertilizer amounts in the "recommendations" and "organicOptions" must be the TOTAL amount for the specified ${area} ${unit} area.
- "perUnitList" should contain the STANDARD rate per 1 ${unit} for reference.
- Return arrays for recommendations, organicOptions, and perUnitList.`;

    const response = await client.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content || "{}";

    let parsedResult: any;
    try {
      parsedResult = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Failed to parse content:", text);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Convert area to Bengali if language is Bengali
    const displayArea = language === "bn" ? toBengaliNumber(area) : area;

    // Format numbers in the response
    const processedRecommendations = formatFertilizerText(
      parsedResult.recommendations || [],
      language
    );

    const processedOrganicOptions = formatFertilizerText(
      parsedResult.organicOptions || [],
      language
    );

    const processedPerUnitList = formatFertilizerText(
      parsedResult.perUnitList || [],
      language
    );

    // Ensure arrays
    const toArray = (val: string | string[]) => Array.isArray(val) ? val : [val];

    return {
      cropName: parsedResult.cropName || cropType,
      area: displayArea as any,
      unit: unit,
      recommendations: toArray(processedRecommendations),
      organicOptions: toArray(processedOrganicOptions),
      perUnitList: toArray(processedPerUnitList)
    };
  } catch (error: any) {
    console.error(`Error calculating fertilizer for ${cropType}:`, error);
    throw new Error(`Failed to calculate fertilizer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export interface PesticideRecommendation {
  cropName: string;
  area: number;
  unit: string;
  recommendations: string[];
  calibration: {
    waterRequired: string; // e.g. "Total 200 Liters"
    numberOfTanks: string; // e.g. "12 Tanks (16L each)"
    dosePerTank: string;   // e.g. "50ml per tank"
    totalPesticide: string; // e.g. "Total 100ml"
  };
  safetyPrecautions?: string[]; // Kept for backward compatibility
}

export async function calculatePesticide(
  cropType: CropType,
  area: number,
  unit: "acre" | "bigha",
  language: "en" | "bn" = "en"
): Promise<PesticideRecommendation> {
  try {
    const client = getGroqClient();
    const model = getModel("text");

    // Convert bigha to acres for consistency (1 bigha ≈ 0.33 acres)
    const areaInAcres = unit === "bigha" ? area * 0.33 : area;

    const cropInfo = cropDiseaseInfo[cropType];
    const languageInstruction = language === "bn"
      ? "Provide all responses in Bengali (বাংলা) language. Use very natural, fluent, and encouraging farmer-friendly language."
      : "Provide all responses in English language. Use very natural, fluent, and encouraging farmer-friendly language.";

    const prompt = `You are an expert agricultural consultant known as 'Crop Doctor AI'.
    
    ${languageInstruction}

    The farmer is growing ${cropType} on ${area} ${unit}.
    
    TASK: Provide a strict **Pesticide Application Schedule** (Insecticides & Fungicides) for the lifecycle.
    
    CRITICAL INSTRUCTION 1 (Recommendations):
    - Return a LIST of pesticides.
    - FORMAT each item EXACTLY like this: "(Pesticide Name) - (When to apply) - (Amount for ${area} ${unit})"
    - Example: "Virtako 40WG - Day 15-20 (Vegetative) - 50g for ${area} ${unit}"
    - "Answer as you know originally" - use your standard expert knowledge for the schedule.

    CRITICAL INSTRUCTION 2 (Calibration):
    - Provide the mixing dose for **ONE standard 16-Liter Knapsack Sprayer**.
    - This is the most important "How to mix" instruction.

    Provide JSON with:
    {
      "cropName": "crop name",
      "area": ${area},
      "unit": "${unit}",
      "recommendations": [
        "Product Name - Time (e.g., Day 15) - Exact Amount for ${area} ${unit}",
        "Product Name - Time (e.g., Day 45) - Exact Amount for ${area} ${unit}"
      ],
      "calibration": {
        "dosePerTank": "Exact amount (ml/g) per 16L Tank",
        "totalPesticide": "Total amount for full area (optional)"
      }
    }
    
    IMPORTANT:
    - NO safety precautions.
    - STRICTLY follow the recommendation format: Product - Time - Total Amount.
    - Format numbers modifiers to the language (Bengali digits if bn).
    - Return valid JSON only.`;

    const response = await client.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content || "{}";

    let parsedResult: any;
    try {
      parsedResult = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Failed to parse AI response");
    }

    const displayArea = language === "bn" ? toBengaliNumber(area) : area;

    return {
      cropName: parsedResult.cropName || cropType,
      area: displayArea as any,
      unit: unit,
      recommendations: Array.isArray(parsedResult.recommendations) ? parsedResult.recommendations : [parsedResult.recommendations],
      calibration: parsedResult.calibration || { waterRequired: "N/A", numberOfTanks: "N/A", dosePerTank: "N/A", totalPesticide: "N/A" },
      safetyPrecautions: [] // Empty array to prevent crash on cached clients expecting this field
    };

  } catch (error: any) {
    console.error(`Error calculating pesticide for ${cropType}:`, error);
    throw new Error(`Failed to calculate pesticide: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
