
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
  const [showAuth, setShowAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Délai plus court pour l'initialisation
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Écran de chargement initial simplifié
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Initialisation...
        </div>
      </div>
    );
  }

  return <AuthenticatedApp showAuth={showAuth} setShowAuth={setShowAuth} />;
};

const AuthenticatedApp = ({ showAuth, setShowAuth }: { 
  showAuth: boolean; 
  setShowAuth: (show: boolean) => void; 
}) => {
  const { isAuthenticated, loading } = useUnifiedAuth();

  // Écran de chargement pour l'authentification
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Authentification...
        </div>
      </div>
    );
  }

  // Interface utilisateur authentifié
  if (isAuthenticated) {
    return (
      <AppLayout>
        <ComprehensiveDashboard />
      </AppLayout>
    );
  }

  // Interface pour utilisateur non authentifié
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
