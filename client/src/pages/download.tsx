import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Chrome, CheckCircle2, Zap, Wifi, Globe } from "lucide-react";
import { Link } from "wouter";
import { AppDownload } from "@/components/AppDownload";

export default function DownloadPage() {
    const { t } = useLanguage();

    const features = [
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
            icon: CheckCircle2,
            title: t.autoUpdates,
            description: t.autoUpdatesDesc,
        },
        {
            icon: Globe,
            title: t.crossPlatform,
            description: t.crossPlatformDesc,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t.downloadPageTitle}
                description={t.downloadAppDesc}
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <Smartphone className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {t.downloadApp}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t.downloadAppDesc}
                    </p>
                </div>
            </div>

            {/* Download Options */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-12">{t.downloadOptions}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* PWA Option */}
                    <Link href="/download/pwa">
                        <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary/50 h-full group">
                            <CardHeader className="text-center pb-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                    <Chrome className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl">{t.installPWA}</CardTitle>
                                <CardDescription className="text-base">{t.installPWADesc}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button className="w-full gap-2" size="lg">
                                    <Chrome className="w-5 h-5" />
                                    {t.installNow}
                                </Button>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {t.crossPlatformDesc}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Android APK Option */}
                    <Link href="/download/android">
                        <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-green-500/50 h-full group">
                            <CardHeader className="text-center pb-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                                    <Download className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl">{t.downloadAndroid}</CardTitle>
                                <CardDescription className="text-base">{t.downloadAndroidDesc}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700" size="lg">
                                    <Download className="w-5 h-5" />
                                    {t.downloadNow}
                                </Button>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {t.androidVersion}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.appFeatures}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
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

                {/* Quick Install Section */}
                <div className="max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-6">{t.installNow}</h3>
                    <AppDownload />
                </div>

                {/* Learn More */}
                <div className="text-center mt-12">
                    <Link href="/app-features">
                        <Button variant="outline" size="lg" className="gap-2">
                            {t.appFeatures}
                            <CheckCircle2 className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
