import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Apple, Smartphone, CheckCircle2, Monitor } from "lucide-react";
import { AppDownload } from "@/components/AppDownload";

export default function PWADownloadPage() {
    const { t } = useLanguage();

    const installationSteps = [
        { number: 1, text: t.pwaStep1, icon: Chrome },
        { number: 2, text: t.pwaStep2, icon: Smartphone },
        { number: 3, text: t.pwaStep3, icon: CheckCircle2 },
        { number: 4, text: t.pwaStep4, icon: CheckCircle2 },
    ];

    const platforms = [
        {
            name: "Android (Chrome)",
            icon: Chrome,
            steps: [
                t.language === 'bn' ? 'Chrome ব্রাউজারে ওয়েবসাইট খুলুন' : 'Open website in Chrome browser',
                t.language === 'bn' ? 'মেনু (⋮) ট্যাপ করুন' : 'Tap menu (⋮)',
                t.language === 'bn' ? '"হোম স্ক্রিনে যোগ করুন" নির্বাচন করুন' : 'Select "Add to Home screen"',
                t.language === 'bn' ? '"ইনস্টল করুন" ট্যাপ করুন' : 'Tap "Install"',
            ],
        },
        {
            name: "iOS (Safari)",
            icon: Apple,
            steps: [
                t.language === 'bn' ? 'Safari ব্রাউজারে ওয়েবসাইট খুলুন' : 'Open website in Safari browser',
                t.language === 'bn' ? 'শেয়ার বাটন (↑) ট্যাপ করুন' : 'Tap Share button (↑)',
                t.language === 'bn' ? '"হোম স্ক্রিনে যোগ করুন" নির্বাচন করুন' : 'Select "Add to Home Screen"',
                t.language === 'bn' ? '"যোগ করুন" ট্যাপ করুন' : 'Tap "Add"',
            ],
        },
        {
            name: "Desktop (Chrome/Edge)",
            icon: Monitor,
            steps: [
                t.language === 'bn' ? 'Chrome বা Edge ব্রাউজারে ওয়েবসাইট খুলুন' : 'Open website in Chrome or Edge',
                t.language === 'bn' ? 'ঠিকানা বারে ইনস্টল আইকন দেখুন' : 'Look for install icon in address bar',
                t.language === 'bn' ? '"ইনস্টল করুন" ক্লিক করুন' : 'Click "Install"',
                t.language === 'bn' ? 'ইনস্টলেশন নিশ্চিত করুন' : 'Confirm installation',
            ],
        },
    ];

    const pwaFeatures = [
        t.language === 'bn' ? 'কোনো অ্যাপ স্টোর প্রয়োজন নেই' : 'No app store required',
        t.language === 'bn' ? 'তাৎক্ষণিক আপডেট' : 'Instant updates',
        t.language === 'bn' ? 'কম স্টোরেজ ব্যবহার' : 'Less storage usage',
        t.language === 'bn' ? 'সব প্ল্যাটফর্মে কাজ করে' : 'Works on all platforms',
        t.language === 'bn' ? 'সম্পূর্ণ অফলাইন সমর্থন' : 'Full offline support',
        t.language === 'bn' ? 'নেটিভ অ্যাপের মতো অভিজ্ঞতা' : 'Native app-like experience',
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t.pwaPageTitle}
                description={t.installPWADesc}
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-background py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                        <Chrome className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        {t.pwaPageTitle}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        {t.installPWADesc}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
                {/* Quick Install */}
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">{t.installNow}</h2>
                    <AppDownload />
                </div>

                {/* General Steps */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                            {t.installSteps}
                        </CardTitle>
                        <CardDescription>{t.howToInstall}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {installationSteps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.number} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                                            {step.number}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <p className="text-base">{step.text}</p>
                                        </div>
                                        <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Platform-Specific Instructions */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {t.language === 'bn' ? 'প্ল্যাটফর্ম-নির্দিষ্ট নির্দেশাবলী' : 'Platform-Specific Instructions'}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {platforms.map((platform, index) => {
                            const Icon = platform.icon;
                            return (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="space-y-2 text-sm">
                                            {platform.steps.map((step, stepIndex) => (
                                                <li key={stepIndex} className="flex gap-2">
                                                    <span className="font-semibold text-primary shrink-0">{stepIndex + 1}.</span>
                                                    <span className="text-muted-foreground">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* PWA Features */}
                <Card className="bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t.pwaFeatures}</CardTitle>
                        <CardDescription>
                            {t.language === 'bn'
                                ? 'PWA ইনস্টল করার সুবিধা'
                                : 'Benefits of installing as PWA'
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-3">
                            {pwaFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Install Again */}
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                        {t.language === 'bn'
                            ? 'এখনই ইনস্টল করতে প্রস্তুত?'
                            : 'Ready to install now?'
                        }
                    </p>
                    <Button size="lg" className="gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <Chrome className="w-5 h-5" />
                        {t.installNow}
                    </Button>
                </div>
            </div>
        </div>
    );
}
