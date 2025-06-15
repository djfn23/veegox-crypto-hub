
import * as React from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useIsHydrated } from '@/hooks/useIsHydrated';

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

const UnifiedAuthContext = React.createContext<UnifiedAuthContextType | undefined>(undefined);

export const useUnifiedAuth = () => {
  const context = React.useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error('useUnifiedAuth must be used within UnifiedAuthProvider');
  }
  return context;
};

interface UnifiedAuthProviderProps {
  children: React.ReactNode;
}

export function UnifiedAuthProvider({ children }: UnifiedAuthProviderProps) {
  // Protection SSR absolue
  if (typeof window === "undefined") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Authentification sécurisée...
      </div>
    );
  }

  return <UnifiedAuthProviderClient>{children}</UnifiedAuthProviderClient>;
}

// Wrapper: Do not call hooks except useIsHydrated
function UnifiedAuthProviderClient({ children }: UnifiedAuthProviderProps) {
  const isHydrated = useIsHydrated();

  // Only render the real provider after hydration, avoiding rule-of-hooks violation
  if (!isHydrated) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Connexion sécurisée à votre compte...
      </div>
    );
  }

  return <UnifiedAuthProviderInner>{children}</UnifiedAuthProviderInner>;
}

// All hooks & state moved here, this is only rendered after hydration!
function UnifiedAuthProviderInner({ children }: UnifiedAuthProviderProps) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Toast sécurisé qui ne s'exécute qu'après hydratation
  const showToast = React.useCallback(async (message: string, type: 'success' | 'error' = 'success') => {
    try {
      const { toast } = await import('sonner');
      if (type === 'success') {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(`Toast: ${message}`);
    }
  }, []);

  React.useEffect(() => {
    let mounted = true;
    let subscription: any = null;
    const initializeAuth = async () => {
      try {
        // Set up auth state listener
        const { data } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return;
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

  // Loading pendant l'initialisation auth
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Connexion sécurisée à votre compte...
      </div>
    );
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        await showToast('Erreur de connexion: ' + error.message, 'error');
        throw error;
      }
      await showToast('Connexion réussie!');
    } catch (error) {
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
        await showToast('Erreur d\'inscription: ' + error.message, 'error');
        throw error;
      }
      await showToast('Inscription réussie! Vérifiez votre email.');
    } catch (error) {
      throw error;
    }
  };

  const signInWithWallet = async (walletId: string) => {
    try {
      await showToast('Connexion wallet en cours...');
    } catch (error) {
      await showToast('Erreur de connexion wallet', 'error');
    }
  };

  const signOut = async () => {
    try {
      if (session) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
      await showToast('Déconnexion réussie');
    } catch (error) {}
  };

  const value: UnifiedAuthContextType = {
    user,
    session,
    loading: false,
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
