import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  user: any;
  saveUser: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const saveUser = async (userData: any) => {
    try {
      const updatedUser = await saveUserToAPI(userData); // Use lib function
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function saveUserToAPI(userData: any): Promise<any> {
  // Placeholder implementation with TypeScript types
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
