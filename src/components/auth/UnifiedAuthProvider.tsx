
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAlchemyWallet } from '@/hooks/useAlchemyWallet';
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

  // Initialize wallet hook with proper error handling
  const walletData = (() => {
    try {
      return useAlchemyWallet();
    } catch (error) {
      console.error('Error initializing wallet hook:', error);
      return {
        connectWallet: async () => {},
        connectedWallets: [],
        disconnectAllWallets: async () => {}
      };
    }
  })();

  const { connectWallet, connectedWallets = [], disconnectAllWallets } = walletData;

  useEffect(() => {
    let mounted = true;

    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth event:', event, 'Session:', session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name,
            provider: 'supabase'
          });
        } else if (!connectedWallets.length) {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
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
    }).catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [connectedWallets]);

  // Update user when wallets change
  useEffect(() => {
    if (connectedWallets.length > 0 && !session) {
      const primaryWallet = connectedWallets[0];
      setUser({
        id: primaryWallet.address,
        name: primaryWallet.name,
        provider: 'alchemy',
        walletAddress: primaryWallet.address,
        accountType: primaryWallet.accountType,
        isSmartAccount: primaryWallet.isSmartAccount
      });
    } else if (connectedWallets.length === 0 && !session) {
      setUser(null);
    }
  }, [connectedWallets, session]);

  const signInWithEmail = async (email: string, password: string) => {
    try {
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
      console.error('Sign in error:', error);
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
        toast.error('Erreur d\'inscription: ' + error.message);
        throw error;
      }

      toast.success('Inscription réussie! Vérifiez votre email.');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signInWithWallet = async (walletId: string) => {
    try {
      if (disconnectAllWallets) {
        await disconnectAllWallets();
      }
      if (connectWallet) {
        const wallet = await connectWallet(walletId);
        if (wallet) {
          toast.success('Connexion wallet réussie!');
        }
      }
    } catch (error) {
      console.error('Wallet sign in error:', error);
      toast.error('Erreur de connexion wallet');
    }
  };

  const signOut = async () => {
    try {
      if (session) {
        await supabase.auth.signOut();
      }
      if (disconnectAllWallets) {
        await disconnectAllWallets();
      }
      setUser(null);
      setSession(null);
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Sign out error:', error);
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
