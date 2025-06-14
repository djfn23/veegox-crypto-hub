
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

// Debug: Index page loading
console.log('Index: Page component file loaded at', new Date().toISOString());

const Index = () => {
  console.log('Index: Component function called');

  const [showAuth, setShowAuth] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  
  React.useEffect(() => {
    console.log('Index: useEffect triggered for initialization');
    const timer = setTimeout(() => {
      console.log('Index: Initialization timer completed');
      setIsInitialized(true);
    }, 100); // Slightly longer timeout to ensure proper initialization
    
    return () => {
      console.log('Index: Cleanup timer');
      clearTimeout(timer);
    };
  }, []);

  console.log('Index: Current state - isInitialized:', isInitialized);

  if (!isInitialized) {
    console.log('Index: Rendering initialization screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Initialisation de Veegox...
        </div>
      </div>
    );
  }

  console.log('Index: Initialization complete, rendering AuthenticatedApp');
  return <AuthenticatedApp showAuth={showAuth} setShowAuth={setShowAuth} />;
};

const AuthenticatedApp = ({ showAuth, setShowAuth }: { 
  showAuth: boolean; 
  setShowAuth: (show: boolean) => void; 
}) => {
  console.log('AuthenticatedApp: Component rendering with showAuth:', showAuth);

  const { isAuthenticated, loading, user } = useUnifiedAuth();

  console.log('AuthenticatedApp: Auth state details:', { 
    isAuthenticated, 
    loading, 
    userExists: !!user,
    userId: user?.id || 'none'
  });

  if (loading) {
    console.log('AuthenticatedApp: Auth still loading, showing loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          Authentification en cours...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('AuthenticatedApp: User authenticated, rendering dashboard');
    try {
      return (
        <AppLayout>
          <ComprehensiveDashboard />
        </AppLayout>
      );
    } catch (error) {
      console.error('AuthenticatedApp: Error rendering dashboard:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-xl font-bold mb-2">Erreur de chargement du tableau de bord</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }
  }

  console.log('AuthenticatedApp: User not authenticated, rendering landing page');

  const handleLoginClick = () => {
    console.log('AuthenticatedApp: Login button clicked');
    setShowAuth(true);
  };

  const handleSignupClick = () => {
    console.log('AuthenticatedApp: Signup button clicked');
    setShowAuth(true);
  };

  try {
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
          onClose={() => {
            console.log('AuthenticatedApp: Closing login modal');
            setShowAuth(false);
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('AuthenticatedApp: Error rendering landing page:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-2">Erreur de chargement de la page</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recharger
          </button>
        </div>
      </div>
    );
  }
};

console.log('Index: Component definition complete');

export default Index;
