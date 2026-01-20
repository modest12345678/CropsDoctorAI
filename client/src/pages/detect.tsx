import DiseaseDetector from "@/components/DiseaseDetector";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ScanLine, Sprout, Leaf } from "lucide-react";

export default function DetectPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SEO
                title="Disease Detector"
                description="Upload photos of your crops to instantly detect diseases using AI and get organic treatment recommendations."
            />
            
            <DiseaseDetector />

            {/* SEO Content Section - Visible to Crawler */}
            <div className="mt-16 grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="bg-green-50/50 border-green-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800">
                            <ScanLine className="w-5 h-5" />
                            How it Works
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-3 text-green-900/80">
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                                <span>Take a clear photo of the affected leaf or crop part.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                                <span>Upload the image using the detector tool above.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                                <span>Wait a few seconds for our AI to analyze the symptoms.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold bg-green-200 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                                <span>Get instant diagnosis and organic treatment advice.</span>
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                            <Sprout className="w-5 h-5" />
                            Why Choose AI Detection?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-blue-900/80">
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800">Instant Results:</span> No need to wait for lab reports. Get answers in seconds.</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800">High Accuracy:</span> Trained on thousands of plant disease images for reliable detection.</p>
                        </div>
                        <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <p><span className="font-semibold text-blue-800">Organic Solutions:</span> We prioritize eco-friendly and organic treatment methods.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-primary/10 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-primary" />
                            Supported Crops
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Our Disease Detector currently supports a wide range of common crops. We are continuously updating our AI model to include more varieties.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Rice", "Wheat", "Corn (Maize)", "Potato", "Tomato", "Tea", "Sugarcane", "Jute", "Mustard", "Mango", "Banana", "Brinjal", "Chili", "Onion", "Garlic", "Ginger", "Turmeric"].map((crop) => (
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

