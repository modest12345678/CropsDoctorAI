import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, CheckCircle2, AlertCircle, ExternalLink, HardDrive, Wifi } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const APK_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1V270j7aAw-3Mz0gnhhKGkDiHmwC8L6dS';

export default function AndroidDownloadPage() {
    const { t } = useLanguage();

    const systemReqs = [
        { icon: Smartphone, text: t.androidVersion },
        { icon: HardDrive, text: t.storageSpace },
        { icon: Wifi, text: t.internetConnection },
    ];

    const installationSteps = [
        { number: 1, text: t.step1 },
        { number: 2, text: t.step2 },
        { number: 3, text: t.step3 },
        { number: 4, text: t.step4 },
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t.androidPageTitle}
                description={t.downloadAndroidDesc}
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-green-500/10 via-green-500/5 to-background py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                        <Download className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        {t.androidPageTitle}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        {t.downloadAndroidDesc}
                    </p>

                    {/* Download Button */}
                    <a href={APK_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="gap-3 bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
                            <Download className="w-6 h-6" />
                            {t.downloadNow}
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </a>
                    <p className="text-sm text-muted-foreground mt-4">
                        Version 1.1.1 • 26 MB
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
                {/* System Requirements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Smartphone className="w-6 h-6 text-primary" />
                            {t.systemRequirements}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            {systemReqs.map((req, index) => {
                                const Icon = req.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                                        <Icon className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm">{req.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Installation Steps */}
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
                            {installationSteps.map((step) => (
                                <div key={step.number} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                                        {step.number}
                                    </div>
                                    <p className="text-base pt-1">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Security Notice */}
                <Alert>
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Security Notice</AlertTitle>
                    <AlertDescription>
                        {t.language === 'bn'
                            ? 'এই APK ফাইলটি নিরাপদ এবং ক্রপ ডাক্তার এআই টিম দ্বারা স্বাক্ষরিত। আপনার ডিভাইসের সেটিংসে "অজানা উৎস থেকে ইনস্টল" সক্ষম করতে হতে পারে।'
                            : 'This APK file is safe and signed by the Crop Doctor AI team. You may need to enable "Install from Unknown Sources" in your device settings.'
                        }
                    </AlertDescription>
                </Alert>

                {/* Features */}
                <Card className="bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t.androidFeatures}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {[
                                t.offlineAccessDesc,
                                t.fastPerformanceDesc,
                                t.autoUpdatesDesc,
                                t.bilingualDesc,
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Download Again */}
                <div className="text-center">
                    <a href={APK_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="gap-3 bg-green-600 hover:bg-green-700">
                            <Download className="w-5 h-5" />
                            {t.downloadNow}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
