import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../@types/type";
import { getUser, saveUser } from "../services/storage";

// Tipos de contexto
type AUthContextData = {
    user: User | null;
    isLoading: boolean;
    signIn: (name: string, email: string) => Promise<void>;
    signOut: () => Promise<void>;
}

// Criação do contexto
const AuthContext = createContext<AUthContextData>({} as AUthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const savedUser = await getUser();
            if (savedUser) setUser(savedUser);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    async function signIn(name: string, email: string) {
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
        cart: { items: [], total: 0 }
            };
        await saveUser(newUser);
        setUser(newUser);
    }

    async function signOut() {
        setUser(null); }

        return (
            <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
                {children}
            </AuthContext.Provider>
        );
    }


export function useAuth() {
    return useContext(AuthContext);
}
        


    