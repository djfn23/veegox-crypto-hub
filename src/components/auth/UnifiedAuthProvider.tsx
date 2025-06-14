
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  provider: 'supabase' | 'alchemy';
  walletAddress?: string;
  accountType?: 'eoa' | 'simple' | 'light';
  isSmartAccount?: boolean;
}

interface UnifiedAuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithWallet: (walletId: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(undefined);

export const useUnifiedAuth = () => {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error('useUnifiedAuth must be used within UnifiedAuthProvider');
  }
  return context;
};

interface UnifiedAuthProviderProps {
  children: ReactNode;
}

export const UnifiedAuthProvider: React.FC<UnifiedAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('UnifiedAuthProvider: Auth event:', event, 'Session:', session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name,
            provider: 'supabase'
          });
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log('UnifiedAuthProvider: Retrieved existing session:', !!session);
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name,
          provider: 'supabase'
        });
      }
      setLoading(false);
    }).catch((error) => {
      console.error('UnifiedAuthProvider: Error getting session:', error);
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      console.log('UnifiedAuthProvider: Cleanup');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log('UnifiedAuthProvider: Signing in with email:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('Erreur de connexion: ' + error.message);
        throw error;
      }

      toast.success('Connexion réussie!');
    } catch (error) {
      console.error('UnifiedAuthProvider: Sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      console.log('UnifiedAuthProvider: Signing up with email:', email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast.error('Erreur d\'inscription: ' + error.message);
        throw error;
      }

      toast.success('Inscription réussie! Vérifiez votre email.');
    } catch (error) {
      console.error('UnifiedAuthProvider: Sign up error:', error);
      throw error;
    }
  };

  const signInWithWallet = async (walletId: string) => {
    try {
      console.log('UnifiedAuthProvider: Wallet sign in requested for:', walletId);
      toast.success('Connexion wallet en cours...');
    } catch (error) {
      console.error('UnifiedAuthProvider: Wallet sign in error:', error);
      toast.error('Erreur de connexion wallet');
    }
  };

  const signOut = async () => {
    try {
      console.log('UnifiedAuthProvider: Signing out');
      if (session) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('UnifiedAuthProvider: Sign out error:', error);
    }
  };

  const value: UnifiedAuthContextType = {
    user,
    session,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithWallet,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};
