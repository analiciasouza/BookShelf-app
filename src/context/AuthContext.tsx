import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authService } from '../services/auth.services'

type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  avatar: string | null;
};

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaura sessão ao abrir o app
  useEffect(() => {
    async function loadSession() {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch {
        // Token inválido ou expirado — limpa
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await authService.login({ email, password });
    await SecureStore.setItemAsync('access_token', response.tokens.access);
    await SecureStore.setItemAsync('refresh_token', response.tokens.refresh);
    setUser(response.user);
  }

  async function signUp(userData: any) {
    const response = await authService.register(userData);
    await SecureStore.setItemAsync('access_token', response.tokens.access);
    await SecureStore.setItemAsync('refresh_token', response.tokens.refresh);
    setUser(response.user);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ← hook que estava faltando
export function useAuth() {
  return useContext(AuthContext);
}