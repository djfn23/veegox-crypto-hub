
import { useState } from "react";
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
  const { isAuthenticated, loading } = useUnifiedAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-lg">Chargement...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <AppLayout>
        <ComprehensiveDashboard />
      </AppLayout>
    );
  }

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
