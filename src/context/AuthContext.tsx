import React, { createContext, useEffect, useState } from 'react';
import { User } from '../@types/type';

// Tipos de contexto
type AuthContextData = {
    user: User | null;
    isLoading: boolean;
    signIn: (name: string, email: string) => Promise<void>;
    signOut: () => Promise<void>;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

     async function signIn(name: string, email: string) {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      cart: { items: [], total: 0 },
    };
    setUser(newUser);
  }

  async function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
        


    