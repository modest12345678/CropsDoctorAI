import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    keywords?: string;
    // App-specific props for download pages
    isAppDownload?: boolean;
    appVersion?: string;
    appSize?: string;
    appCategory?: string;
}

export function SEO({
    title,
    description = "Free AI Plant Disease Detection for farmers. Instantly identify crop diseases, calculate fertilizers, and analyze soil health with Crop Doctor.",
    image = "/cover-photo.png",
    type = "website",
    keywords = "crop doctor, plant disease detection, leaf disease detection, ai agriculture, fertilizer calculator, soil health, farming app, smart farming bangladesh",
    isAppDownload = false,
    appVersion = "1.1.1",
    appSize = "26 MB",
    appCategory = "Agriculture"
}: SEOProps) {
    const [location] = useLocation();
    const siteUrl = "https://cropsdoctor.vercel.app";
    const fullUrl = `${siteUrl}${location}`;
    const fullTitle = title ? `${title} | Crop Doctor AI` : "Crop Doctor - AI Plant Disease Detection";
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    // Enhanced schema for app download pages
    const appDownloadSchema = {
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "name": "Crop Doctor AI",
        "applicationCategory": `${appCategory}Application`,
        "operatingSystem": "Android 6.0+",
        "softwareVersion": appVersion,
        "fileSize": appSize,
        "downloadUrl": "https://cropsdoctor.vercel.app/download-android",
        "installUrl": "https://cropsdoctor.vercel.app/download-android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "description": description,
        "image": fullImage,
        "screenshot": [
            `${siteUrl}/screenshots/home.png`,
            `${siteUrl}/screenshots/disease-detector.png`,
            `${siteUrl}/screenshots/fertilizer-calc.png`
        ],
        "url": fullUrl,
        "author": {
            "@type": "Organization",
            "name": "Crop Doctor AI Team",
            "url": siteUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "Crop Doctor AI",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "featureList": [
            "AI-powered plant disease detection",
            "Fertilizer calculator",
            "Pesticide dosage calculator",
            "Soil health analysis",
            "Offline mode support",
            "Bilingual (English & Bengali)"
        ],
        "permissions": "Camera, Internet",
        "potentialAction": {
            "@type": "DownloadAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://cropsdoctor.vercel.app/download-android",
                "actionPlatform": [
                    "http://schema.org/AndroidPlatform"
                ]
            }
        }
    };

    // Standard website schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Crop Doctor AI",
        "applicationCategory": "AgricultureApplication",
        "operatingSystem": "Web, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": description,
        "image": fullImage,
        "url": fullUrl,
        "author": {
            "@type": "Organization",
            "name": "Crop Doctor AI Team",
            "url": siteUrl
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        }
    };

    const schemaData = isAppDownload ? appDownloadSchema : websiteSchema;

    // Generate BreadcrumbList schema based on current route
    const pathSegments = location.split('/').filter(Boolean);
    const pageNameMap: Record<string, string> = {
        'detect': 'Disease Detector',
        'fertilizer': 'Fertilizer Calculator',
        'pesticide': 'Pesticide Calculator',
        'soil-fertility': 'Soil Analysis',
        'weather': 'Weather Forecast',
        'history': 'History',
        'download': 'Download',
        'download-android': 'Android Download',
        'download-pwa': 'PWA Install',
        'whitepaper': 'Whitepaper',
        'training': 'Training',
        'dashboard': 'Dashboard',
        'app-features': 'App Features'
    };

    const breadcrumbSchema = pathSegments.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            ...pathSegments.map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": pageNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`
            }))
        ]
    } : null;

    // Enhanced keywords for app download pages
    const appKeywords = isAppDownload
        ? `${keywords}, android app download, crop doctor apk, farming app android, agriculture app download, plant disease app, free farming app`
        : keywords;

    return (
        <Helmet>
            {/* Basic Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={appKeywords} />
            <link rel="canonical" href={fullUrl} />

            {/* App-specific meta tags */}
            {isAppDownload && (
                <>
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="application-name" content="Crop Doctor AI" />
                    <meta name="apple-mobile-web-app-title" content="Crop Doctor AI" />
                </>
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={isAppDownload ? "product" : type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Crop Doctor AI" />

            {/* App-specific Open Graph tags */}
            {isAppDownload && (
                <>
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="product:price:amount" content="0" />
                    <meta property="product:price:currency" content="USD" />
                </>
            )}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* App-specific Twitter tags */}
            {isAppDownload && (
                <>
                    <meta name="twitter:app:name:googleplay" content="Crop Doctor AI" />
                    <meta name="twitter:app:url:googleplay" content="https://cropsdoctor.vercel.app/download-android" />
                </>
            )}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
            {/* BreadcrumbList Schema for subpages */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
}
