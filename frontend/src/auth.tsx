import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { apiUrl } from "./lib/api";

interface User {
  id: string;
  username: string;
  email: string;
}

export async function verifySession(): Promise<User | null> {
  const response = await fetch(apiUrl("/validate-token"), {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as {
    valid: boolean;
    user: User | null;
  };

  if (result.valid && result.user) {
    return result.user;
  }

  return null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  verifySession: () => Promise<User | null>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    const response = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData.user);
      setIsAuthenticated(true);
      queryClient.setQueryData(["auth", "validate"], {
        valid: true,
        user: userData.user,
      });
    } else {
      throw new Error("Authentication failed");
    }
  };

  const logout = async () => {
    await fetch(apiUrl("/logout"), {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
  };

  const verifySessionWithState = async () => {
    try {
      const response = await fetch(apiUrl("/validate-token"), {
        credentials: "include",
      });
      if (!response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
      const result = (await response.json()) as {
        valid: boolean;
        user: User | null;
      };
      if (result.valid && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result.user;
      }
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        verifySession: verifySessionWithState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
