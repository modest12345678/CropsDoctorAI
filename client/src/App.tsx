import { Switch, Route, Link, useLocation } from "wouter";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { lazy, Suspense } from "react";

// Lazy-loaded pages for code splitting
const Home = lazy(() => import("@/pages/home"));
const History = lazy(() => import("@/pages/history"));
const Fertilizer = lazy(() => import("@/pages/fertilizer"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Training = lazy(() => import("@/pages/training"));
const TracePage = lazy(() => import("@/pages/trace"));
const FarmerDashboard = lazy(() => import("@/pages/farmer-dashboard"));
const AddStage = lazy(() => import("@/pages/add-stage"));
const DetectPage = lazy(() => import("@/pages/detect"));
const SoilFertility = lazy(() => import("@/pages/soil-fertility"));
const WeatherForecast = lazy(() => import("@/pages/weather"));
const Pesticide = lazy(() => import("@/pages/pesticide"));
const Whitepaper = lazy(() => import("@/pages/whitepaper"));
const DownloadPage = lazy(() => import("@/pages/download"));
const AndroidDownloadPage = lazy(() => import("@/pages/download-android"));
const PWADownloadPage = lazy(() => import("@/pages/download-pwa"));
const AppFeaturesPage = lazy(() => import("@/pages/app-features"));

import { Leaf, Home as HomeIcon, History as HistoryIcon, GraduationCap, Languages, Stethoscope, Sprout, FileText, LayoutGrid, CloudRain, Calendar as CalendarIcon, MapPin, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navigation() {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon, testId: "nav-home" },
  ];

  return (
    <>
      {/* Skip link for accessibility - keyboard navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>
      <nav className="border-b-0 bg-primary text-primary-foreground shadow-md sticky top-0 z-50 transition-colors duration-300 pt-[env(safe-area-inset-top)]" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity px-2 py-1 rounded-md" data-testid="logo">
                <div className="h-14 w-14 flex items-center justify-center">
                  <img src="/logo.png" alt="Crop Doctor AI Logo" width={56} height={56} className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-2xl tracking-tight shadow-sm stroke-black hidden sm:block font-display">{t.appTitle}</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary-foreground/80" />
                <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "bn")}>
                  <SelectTrigger className="w-32 h-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 focus:ring-primary-foreground/50 transition-colors" data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" data-testid="option-language-en">
                      {t.english}
                    </SelectItem>
                    <SelectItem value="bn" data-testid="option-language-bn">
                      {t.bangla}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dark mode toggle */}
              <DarkModeToggle />

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 transition-all duration-200 ${isActive
                        ? "bg-white text-primary hover:bg-white/90 shadow-sm font-semibold"
                        : "text-primary-foreground hover:bg-white/10 hover:text-white"
                        }`}
                      data-testid={item.testId}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary-foreground hover:bg-white/10 hover:text-white" data-testid="nav-tools">
                    <LayoutGrid className="w-5 h-5" />
                    <span className="hidden sm:inline">{t.actions || "Tools"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t.actions || "Tools"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <Link href="/detect">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <Stethoscope className="w-4 h-4" />
                      <span>{t.diseaseDetectorButton || "Disease Detector"}</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/fertilizer">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <Sprout className="w-4 h-4" />
                      <span>{t.fertilizerCalculatorButton || "Fertilizer Calculator"}</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/pesticide">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <Bug className="w-4 h-4" />
                      <span>{t.pesticideCalculator || "Pesticide Calculator"}</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/soil-fertility">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{t.soilFertility || "Soil Analysis"}</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/weather">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <CloudRain className="w-4 h-4" />
                      <span>{t.weatherForecast || "Weather"}</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <Link href="/history">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <HistoryIcon className="w-4 h-4" />
                      <span>{t.navHistory || "History"}</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function Footer() {
  const { t } = useLanguage();
  // Build date computed once at module level to avoid re-renders
  const BUILD_DATE = "2026-01-24";
  return (
    <footer className="border-t py-6 mt-auto bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
        <span>© 2025 Crop Doctor AI</span>
        <span>•</span>
        <Link href="/whitepaper">
          <a className="hover:text-primary transition-colors flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {t.whitepaper}
          </a>
        </Link>
        <span className="text-xs opacity-50">v1.1.1 (Build: {BUILD_DATE})</span>
      </div>
    </footer>
  );
}
// Loading spinner component for Suspense fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fertilizer" component={Fertilizer} />
      <Route path="/history" component={History} />
      <Route path="/training" component={Training} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/dashboard" component={FarmerDashboard} />
      <Route path="/dashboard/cycle/:id" component={AddStage} />
      <Route path="/trace/:id" component={TracePage} />
      <Route path="/detect" component={DetectPage} />
      <Route path="/soil-fertility" component={SoilFertility} />
      <Route path="/weather" component={WeatherForecast} />
      <Route path="/pesticide" component={Pesticide} />
      <Route path="/download" component={DownloadPage} />
      <Route path="/download/android" component={AndroidDownloadPage} />
      <Route path="/download/pwa" component={PWADownloadPage} />
      <Route path="/app-features" component={AppFeaturesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { useEffect } from "react";
import { Device } from "@capacitor/device";
import { apiRequest } from "./lib/queryClient";
import { useAndroidBackButton } from "@/hooks/useAndroidBackButton";

function App() {
  // Handle Android back button navigation
  useAndroidBackButton();

  useEffect(() => {
    const registerDevice = async () => {
      try {
        // Try to get device info, fallback to basic browser info
        let deviceInfo: any = { platform: 'web' };
        try {
          deviceInfo = await Device.getInfo();
        } catch {
          // Capacitor not available (browser), use navigator info
          deviceInfo = {
            platform: 'web',
            operatingSystem: navigator.platform,
            model: navigator.userAgent,
          };
        }

        const response = await apiRequest("POST", "/api/register", {
          deviceInfo
        });
        console.log("📍 Visitor registered successfully:", response);
      } catch (error) {
        console.error("Failed to register device:", error);
      }
    };

    registerDevice();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <LanguageProvider>
            <Navigation />
            <main id="main-content" className="min-h-[calc(100vh-4rem-5rem)] pb-[env(safe-area-inset-bottom)]">
              <Suspense fallback={<PageLoader />}>
                <Router />
              </Suspense>
            </main>
            <Footer />
            <Toaster />
            <SpeedInsights />
          </LanguageProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
