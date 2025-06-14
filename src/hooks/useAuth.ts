
import React, { useState, useEffect, createContext, useContext } from 'react';

// Interface pour l'utilisateur
interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

// Interface pour le contexte d'auth
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  signOut: () => void;
}

// Valeurs par défaut sécurisées pour le serveur
const defaultAuthState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  signOut: () => {},
};

// Créer le contexte
const AuthContext = createContext<AuthContextType>(defaultAuthState);

// Hook pour utiliser l'auth - TOUJOURS appeler les hooks
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Fallback côté serveur
  if (!context) {
    return defaultAuthState;
  }
  
  return context;
};

// Provider d'auth
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'état d'auth au démarrage
    const checkAuthStatus = async () => {
      try {
        // Simuler une vérification d'auth
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erreur lors de la vérification auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simuler une connexion
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signOut = () => {
    logout();
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simuler une inscription
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Erreur d inscription:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
