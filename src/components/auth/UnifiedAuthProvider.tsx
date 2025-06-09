
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

  const { connectWallet, connectedWallets, disconnectAllWallets } = useAlchemyWallet();

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
    });

    return () => subscription.unsubscribe();
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Erreur de connexion: ' + error.message);
      throw error;
    }

    toast.success('Connexion réussie!');
  };

  const signUpWithEmail = async (email: string, password: string) => {
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
  };

  const signInWithWallet = async (walletId: string) => {
    await disconnectAllWallets(); // Clear existing connections
    const wallet = await connectWallet(walletId);
    if (wallet) {
      toast.success('Connexion wallet réussie!');
    }
  };

  const signOut = async () => {
    if (session) {
      await supabase.auth.signOut();
    }
    await disconnectAllWallets();
    setUser(null);
    setSession(null);
    toast.success('Déconnexion réussie');
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
