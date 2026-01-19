import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Smartphone, Check, ExternalLink, Apple, Chrome } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

// APK hosted directly on Vercel for one-click download
const APK_DOWNLOAD_URL = '/CropsDoctorAI-release.apk';

export function AppDownload() {
    const { language } = useLanguage();
    const { canInstall, isInstalled, installPWA } = usePWAInstall();
    const [installing, setInstalling] = useState(false);

    // Don't show download section if running inside native app
    const isNativeApp = Capacitor.isNativePlatform();

    // Return null if running in native app - no need for download option
    if (isNativeApp) {
        return null;
    }

    const t = {
        title: language === 'bn' ? 'অ্যাপ ডাউনলোড করুন' : 'Download App',
        subtitle: language === 'bn'
            ? 'আপনার ফোনে ইনস্টল করুন - অফলাইনে ব্যবহার করুন'
            : 'Install on your phone - Use offline',
        installPWA: language === 'bn' ? 'ইনস্টল করুন' : 'Install App',
        downloadAPK: language === 'bn' ? 'Android APK ডাউনলোড' : 'Download Android APK',
        installed: language === 'bn' ? 'ইনস্টল হয়েছে!' : 'Installed!',
        installing: language === 'bn' ? 'ইনস্টল হচ্ছে...' : 'Installing...',
        pwaDesc: language === 'bn'
            ? 'ব্রাউজার থেকে সরাসরি ইনস্টল - সব ডিভাইসে কাজ করে'
            : 'Install directly from browser - Works on all devices',
        apkDesc: language === 'bn'
            ? 'Android APK ফাইল ডাউনলোড করুন'
            : 'Download Android APK file',
        iosHint: language === 'bn'
            ? 'iOS এ: Share বাটনে ক্লিক করুন → "Add to Home Screen"'
            : 'On iOS: Tap Share → "Add to Home Screen"',
    };

    const handleInstall = async () => {
        setInstalling(true);
        await installPWA();
        setInstalling(false);
    };

    // Detect if on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    return (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-lg">
            <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                    <Smartphone className="w-6 h-6 text-primary" />
                    {t.title}
                </CardTitle>
                <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* PWA Install Button */}
                {isInstalled ? (
                    <div className="flex items-center justify-center gap-2 py-3 px-4 bg-green-100 rounded-lg text-green-700">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">{t.installed}</span>
                    </div>
                ) : canInstall ? (
                    <Button
                        onClick={handleInstall}
                        disabled={installing}
                        className="w-full py-6 text-lg gap-3 bg-primary hover:bg-primary/90"
                    >
                        <Chrome className="w-6 h-6" />
                        {installing ? t.installing : t.installPWA}
                    </Button>
                ) : (
                    <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {isIOS ? (
                            <div className="flex items-center justify-center gap-2">
                                <Apple className="w-4 h-4" />
                                <span>{t.iosHint}</span>
                            </div>
                        ) : (
                            <span>{t.pwaDesc}</span>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            {language === 'bn' ? 'অথবা' : 'or'}
                        </span>
                    </div>
                </div>

                {/* APK Download Button */}
                <a href={APK_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                        variant="outline"
                        className="w-full py-5 gap-3 border-2 hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                    >
                        <Download className="w-5 h-5" />
                        {t.downloadAPK}
                        <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                </a>
                <p className="text-xs text-center text-muted-foreground">{t.apkDesc}</p>
            </CardContent>
        </Card>
    );
}
