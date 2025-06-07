
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const getAuthProvider = () => {
    if (!user) return null;
    
    // Check app_metadata for provider information
    const provider = user.app_metadata?.provider;
    if (provider) return provider;
    
    // Fallback: check if email exists (email/password auth)
    if (user.email && !user.phone) return 'email';
    
    return 'unknown';
  };

  const isOAuthUser = () => {
    const provider = getAuthProvider();
    return provider && provider !== 'email';
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
    authProvider: getAuthProvider(),
    isOAuthUser: isOAuthUser(),
  };
};
