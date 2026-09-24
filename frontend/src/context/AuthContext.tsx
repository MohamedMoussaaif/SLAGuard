import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types/auth';
import { authApi } from '../api/authApi';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the current user on app load if a token exists
  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = storage.getToken();
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const authData = await authApi.getAuthenticatedUser();
        setUser(authData.user);
        setToken(savedToken);
      } catch {
        // If token is expired or invalid
        storage.clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const res = await authApi.login(credentials);
    storage.setToken(res.token);
    setToken(res.token);
    
    // Fetch fresh user data using the new token
    const authData = await authApi.getAuthenticatedUser();
    setUser(authData.user);
  };

  const register = async (data: RegisterRequest) => {
    const res = await authApi.register(data);
    storage.setToken(res.token);
    setToken(res.token);

    // Fetch fresh user data using the new token
    const authData = await authApi.getAuthenticatedUser();
    setUser(authData.user);
  };

  const refreshUser = async () => {
    try {
      const authData = await authApi.getAuthenticatedUser();
      setUser(authData.user);
    } catch {
      logout();
    }
  };

  const logout = () => {
    storage.clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};