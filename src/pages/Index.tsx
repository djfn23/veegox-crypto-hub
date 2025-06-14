
import { useState, useEffect } from "react";
import { NavigationBar } from "@/components/home/NavigationBar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { AppFooter } from "@/components/home/AppFooter";
import { LoginModal } from "@/components/auth/LoginModal";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import ComprehensiveDashboard from "@/components/ComprehensiveDashboard";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Safely get auth state with fallback
  let isAuthenticated = false;
  let loading = true;
  
  try {
    const authState = useUnifiedAuth();
    isAuthenticated = authState?.isAuthenticated || false;
    loading = authState?.loading || false;
  } catch (error) {
    console.error('Error accessing auth state:', error);
    loading = false;
  }

  useEffect(() => {
    // Add a delay to ensure all providers are properly initialized
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while initializing
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Chargement...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <ErrorBoundary>
        <TooltipProvider>
          <AppLayout>
            <ComprehensiveDashboard />
          </AppLayout>
        </TooltipProvider>
      </ErrorBoundary>
    );
  }

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleSignupClick = () => {
    setShowAuth(true);
  };

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
          <NavigationBar 
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
          />

          <HeroSection onSignupClick={handleSignupClick} />

          <FeaturesSection />

          <CTASection onSignupClick={handleSignupClick} />

          <AppFooter />

          <LoginModal
            isOpen={showAuth}
            onClose={() => setShowAuth(false)}
          />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default Index;
