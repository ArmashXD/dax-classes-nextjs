"use client"

import { useContext,useEffect, createContext,useState } from "react";
import { onAuthStateChanged, type User,signOut } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import Cookies from "js-cookie";

type AuthContextType = {
    user: User | null,
    token: string | null;
    logout: () =>Promise<void>;   
} 


const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    logout: async() => {},
});

export const AuthProvider=({ children } : {children: React.ReactNode})=> {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (authUser) => {
            if (authUser) {
                setUser(authUser);
                const idToken = await authUser.getIdToken()
                setToken(idToken)
                Cookies.set("token", idToken);
            } else {
                setUser(null);
                setToken(null);
                Cookies.remove("token");
            }
        });
        return () => unsubscribe();
},[]);

    const logout =async() => {
       try {
        await signOut(firebaseAuth);
        setUser(null);
        setToken(null);
        Cookies.remove("token");
       } catch (error) {
            console.error("Error signing out: ", error);
    };
    }

  return  <AuthContext.Provider value={{ user, token, logout }}>
        </AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)
