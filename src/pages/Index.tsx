
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import Dashboard from "@/components/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NavigationBar } from "@/components/home/NavigationBar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { AppFooter } from "@/components/home/AppFooter";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  if (user) {
    return <Dashboard />;
  }

  const handleLoginClick = () => {
    setAuthMode("login");
    setShowAuth(true);
  };

  const handleSignupClick = () => {
    setAuthMode("signup");
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

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </div>
  );
};

export default Index;
