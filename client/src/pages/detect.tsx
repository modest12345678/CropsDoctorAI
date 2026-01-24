import DiseaseDetector from "@/components/DiseaseDetector";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ScanLine, Sprout, Leaf } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function DetectPage() {
    const { language, t } = useLanguage();

    // Bilingual crop names
    const cropsBn = ["ধান", "গম", "ভুট্টা", "আলু", "টমেটো", "চা", "আখ", "পাট", "সরিষা", "আম", "কলা", "বেগুন", "মরিচ", "পেঁয়াজ", "রসুন", "আদা", "হলুদ"];
    const cropsEn = ["Rice", "Wheat", "Corn (Maize)", "Potato", "Tomato", "Tea", "Sugarcane", "Jute", "Mustard", "Mango", "Banana", "Brinjal", "Chili", "Onion", "Garlic", "Ginger", "Turmeric"];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SEO
                title="Disease Detector"
                description="Upload photos of your crops to instantly detect diseases using AI and get organic treatment recommendations."
            />

            <DiseaseDetector />

            {/* SEO Content Section - Visible to Crawler */}
            <div className="mt-16 grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                            <ScanLine className="w-5 h-5" />
                            {language === "bn" ? "কিভাবে কাজ করে" : "How it Works"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-3 text-green-900/80 dark:text-green-100/80">
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                                <span>{language === "bn" ? "আক্রান্ত পাতা বা ফসলের একটি স্পষ্ট ছবি তুলুন।" : "Take a clear photo of the affected leaf or crop part."}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                                <span>{language === "bn" ? "উপরের ডিটেক্টর টুল ব্যবহার করে ছবি আপলোড করুন।" : "Upload the image using the detector tool above."}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                                <span>{language === "bn" ? "আমাদের AI লক্ষণ বিশ্লেষণের জন্য কয়েক সেকেন্ড অপেক্ষা করুন।" : "Wait a few seconds for our AI to analyze the symptoms."}</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                                <span>{language === "bn" ? "তাৎক্ষণিক রোগ নির্ণয় ও জৈব চিকিৎসা পরামর্শ পান।" : "Get instant diagnosis and organic treatment advice."}</span>
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
                            <Sprout className="w-5 h-5" />
                            {language === "bn" ? "কেন AI রোগ সনাক্তকরণ?" : "Why Choose AI Detection?"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-blue-900/80 dark:text-blue-100/80">
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800 dark:text-blue-300">{language === "bn" ? "তাৎক্ষণিক ফলাফল:" : "Instant Results:"}</span> {language === "bn" ? "ল্যাব রিপোর্টের জন্য অপেক্ষা করতে হবে না। সেকেন্ডে উত্তর পান।" : "No need to wait for lab reports. Get answers in seconds."}</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800 dark:text-blue-300">{language === "bn" ? "উচ্চ সঠিকতা:" : "High Accuracy:"}</span> {language === "bn" ? "হাজার হাজার উদ্ভিদ রোগের ছবিতে প্রশিক্ষিত।" : "Trained on thousands of plant disease images for reliable detection."}</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800 dark:text-blue-300">{language === "bn" ? "জৈব সমাধান:" : "Organic Solutions:"}</span> {language === "bn" ? "আমরা পরিবেশ বান্ধব ও জৈব চিকিৎসাকে অগ্রাধিকার দিই।" : "We prioritize eco-friendly and organic treatment methods."}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-primary/10 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-primary" />
                            {language === "bn" ? "সমর্থিত ফসল" : "Supported Crops"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {language === "bn"
                                ? "আমাদের রোগ সনাক্তকারী বর্তমানে বিভিন্ন সাধারণ ফসল সমর্থন করে। আমরা ক্রমাগত আমাদের AI মডেল আপডেট করছি।"
                                : "Our Disease Detector currently supports a wide range of common crops. We are continuously updating our AI model to include more varieties."}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {(language === "bn" ? cropsBn : cropsEn).map((crop) => (
                                <span key={crop} className="bg-secondary/50 px-3 py-1 rounded-full text-sm font-medium text-secondary-foreground">
                                    {crop}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
