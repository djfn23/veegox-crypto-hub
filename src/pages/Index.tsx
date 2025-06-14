
import React, { useState, useEffect } from "react";
import { NavigationBar } from "@/components/home/NavigationBar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { AppFooter } from "@/components/home/AppFooter";
import { LoginModal } from "@/components/auth/LoginModal";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import ComprehensiveDashboard from "@/components/ComprehensiveDashboard";

const Index = () => {
  console.log('Index: Component mounting');

  const [showAuth, setShowAuth] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  
  React.useEffect(() => {
    console.log('Index: Initializing...');
    const timer = setTimeout(() => {
      console.log('Index: Initialization complete');
      setIsInitialized(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    console.log('Index: Showing initialization screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Initialisation...
        </div>
      </div>
    );
  }

  console.log('Index: Rendering AuthenticatedApp');
  return <AuthenticatedApp showAuth={showAuth} setShowAuth={setShowAuth} />;
};

const AuthenticatedApp = ({ showAuth, setShowAuth }: { 
  showAuth: boolean; 
  setShowAuth: (show: boolean) => void; 
}) => {
  console.log('AuthenticatedApp: Component mounting');

  const { isAuthenticated, loading } = useUnifiedAuth();

  console.log('AuthenticatedApp: Auth state:', { isAuthenticated, loading });

  if (loading) {
    console.log('AuthenticatedApp: Showing loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Authentification...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('AuthenticatedApp: User authenticated, showing dashboard');
    return (
      <AppLayout>
        <ComprehensiveDashboard />
      </AppLayout>
    );
  }

  console.log('AuthenticatedApp: User not authenticated, showing landing page');

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleSignupClick = () => {
    setShowAuth(true);
  };

  return (
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
  );
};

export default Index;
