
import React, { useState, useEffect, useContext, createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useSecureToast } from '@/hooks/useSecureToast';

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
  children: React.ReactNode;
}

export function UnifiedAuthProvider({ children }: UnifiedAuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { success: toastSuccess, error: toastError } = useSecureToast();

  useEffect(() => {
    let mounted = true;
    let subscription: any = null;

    const initializeAuth = async () => {
      try {
        console.log('UnifiedAuthProvider: Starting auth initialization');
        // Set up auth state listener
        const { data } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return;
            console.log('UnifiedAuthProvider: Auth event:', event, 'Session exists:', !!session);
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
        subscription = data.subscription;

        // Check existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        console.log('UnifiedAuthProvider: Initial session check:', !!session);
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
      } catch (error) {
        console.error('UnifiedAuthProvider: Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Loading fallback
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="text-white text-base animate-pulse">
          Connexion sécurisée à votre compte...
        </div>
      </div>
    );
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        await toastError('Erreur de connexion: ' + error.message);
        throw error;
      }
      await toastSuccess('Connexion réussie!');
    } catch (error) {
      console.error('UnifiedAuthProvider: Sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      if (error) {
        await toastError('Erreur d\'inscription: ' + error.message);
        throw error;
      }
      await toastSuccess('Inscription réussie! Vérifiez votre email.');
    } catch (error) {
      console.error('UnifiedAuthProvider: Sign up error:', error);
      throw error;
    }
  };

  const signInWithWallet = async (walletId: string) => {
    try {
      await toastSuccess('Connexion wallet en cours...');
    } catch (error) {
      console.error('UnifiedAuthProvider: Wallet sign in error:', error);
      await toastError('Erreur de connexion wallet');
    }
  };

  const signOut = async () => {
    try {
      if (session) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
      await toastSuccess('Déconnexion réussie');
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
}
