import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
    Stethoscope, Sprout, MapPin, CloudRain, Bug, Bot,
    Wifi, Zap, Globe, Languages, Download, CheckCircle2,
    Camera, Calculator, Satellite, MessageSquare
} from "lucide-react";

export default function AppFeaturesPage() {
    const { t } = useLanguage();

    const mainFeatures = [
        {
            icon: Stethoscope,
            title: t.diseaseDetectorButton,
            description: t.language === 'bn'
                ? 'AI দিয়ে তাৎক্ষণিকভাবে ফসলের রোগ সনাক্ত করুন এবং চিকিৎসার পরামর্শ পান'
                : 'Instantly detect crop diseases with AI and get treatment recommendations',
            color: 'from-emerald-500 to-green-600',
            link: '/detect',
        },
        {
            icon: Sprout,
            title: t.fertilizerCalculator,
            description: t.language === 'bn'
                ? 'আপনার ফসলের জন্য সঠিক সার পরিমাণ গণনা করুন'
                : 'Calculate precise fertilizer amounts for your crops',
            color: 'from-blue-500 to-cyan-600',
            link: '/fertilizer',
        },
        {
            icon: Bug,
            title: t.pesticideCalculator,
            description: t.language === 'bn'
                ? 'কীটনাশক প্রয়োগের সঠিক পরিমাপ এবং ক্যালিব্রেশন'
                : 'Precise pesticide application measurements and calibration',
            color: 'from-red-600 to-rose-600',
            link: '/pesticide',
        },
        {
            icon: MapPin,
            title: t.soilFertility,
            description: t.language === 'bn'
                ? 'স্যাটেলাইট ডেটা দিয়ে মাটির স্বাস্থ্য বিশ্লেষণ করুন'
                : 'Analyze soil health with satellite data',
            color: 'from-amber-500 to-orange-600',
            link: '/soil-fertility',
        },
        {
            icon: CloudRain,
            title: t.weatherForecast,
            description: t.language === 'bn'
                ? 'আপনার খামারের জন্য হাইপার-লোকাল আবহাওয়ার পূর্বাভাস'
                : 'Hyper-local weather forecast for your farm',
            color: 'from-cyan-500 to-blue-600',
            link: '/weather',
        },
        {
            icon: Bot,
            title: t.aiAssistant,
            description: t.language === 'bn'
                ? 'কৃষি বিষয়ে ২৪/৭ AI সহায়তা পান'
                : 'Get 24/7 AI assistance for farming questions',
            color: 'from-purple-500 to-pink-600',
            link: '/',
        },
    ];

    const keyFeatures = [
        {
            icon: Wifi,
            title: t.offlineAccess,
            description: t.offlineAccessDesc,
        },
        {
            icon: Zap,
            title: t.fastPerformance,
            description: t.fastPerformanceDesc,
        },
        {
            icon: Languages,
            title: t.bilingual,
            description: t.bilingualDesc,
        },
        {
            icon: Globe,
            title: t.crossPlatform,
            description: t.crossPlatformDesc,
        },
        {
            icon: Camera,
            title: t.language === 'bn' ? 'ছবি বিশ্লেষণ' : 'Image Analysis',
            description: t.language === 'bn'
                ? 'উন্নত AI দিয়ে ফসলের ছবি বিশ্লেষণ করুন'
                : 'Analyze crop images with advanced AI',
        },
        {
            icon: Calculator,
            title: t.language === 'bn' ? 'স্মার্ট ক্যালকুলেটর' : 'Smart Calculators',
            description: t.language === 'bn'
                ? 'সার এবং কীটনাশকের জন্য সঠিক গণনা'
                : 'Precise calculations for fertilizers and pesticides',
        },
        {
            icon: Satellite,
            title: t.language === 'bn' ? 'স্যাটেলাইট ডেটা' : 'Satellite Data',
            description: t.language === 'bn'
                ? 'রিয়েল-টাইম স্যাটেলাইট মাটি এবং আবহাওয়া ডেটা'
                : 'Real-time satellite soil and weather data',
        },
        {
            icon: MessageSquare,
            title: t.language === 'bn' ? 'দ্বিভাষিক চ্যাট' : 'Bilingual Chat',
            description: t.language === 'bn'
                ? 'বাংলা এবং ইংরেজিতে AI এর সাথে কথা বলুন'
                : 'Chat with AI in Bangla and English',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t.featuresPageTitle}
                description={t.appFeaturesDesc}
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {t.appFeatures}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t.appFeaturesDesc}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
                {/* Main Tools */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-center">{t.featuredTools}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Link key={index} href={feature.link}>
                                    <Card className="hover:shadow-xl transition-all cursor-pointer h-full group border-2 hover:border-primary/50">
                                        <CardHeader>
                                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Key Features */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {t.language === 'bn' ? 'মূল বৈশিষ্ট্য' : 'Key Features'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Why Choose Section */}
                <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            {t.language === 'bn' ? 'কেন ক্রপ ডাক্তার এআই বেছে নেবেন?' : 'Why Choose Crop Doctor AI?'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <p className="text-muted-foreground">
                                    {t.language === 'bn' ? 'বিনামূল্যে ব্যবহার' : 'Free to Use'}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                <p className="text-muted-foreground">
                                    {t.language === 'bn' ? 'AI সহায়তা' : 'AI Support'}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">2</div>
                                <p className="text-muted-foreground">
                                    {t.language === 'bn' ? 'ভাষা সমর্থন' : 'Languages Supported'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="text-center space-y-6">
                    <h2 className="text-3xl font-bold">
                        {t.language === 'bn' ? 'এখনই শুরু করুন' : 'Get Started Now'}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t.language === 'bn'
                            ? 'আপনার ডিভাইসে ক্রপ ডাক্তার এআই ডাউনলোড করুন এবং স্মার্ট কৃষি শুরু করুন'
                            : 'Download Crop Doctor AI on your device and start smart farming today'
                        }
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/download">
                            <Button size="lg" className="gap-2">
                                <Download className="w-5 h-5" />
                                {t.downloadApp}
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button size="lg" variant="outline" className="gap-2">
                                {t.language === 'bn' ? 'হোমে যান' : 'Go to Home'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
