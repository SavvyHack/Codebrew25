"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from 'axios';

interface User {
  id: number;
  name: string | null;
  email: string;
  type: "customer" | "farmer";
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, type: "customer" | "farmer") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("farmazon_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/signin', { email, password });

      if (response.status === 200 && response.data.user) {
        const userData: User = response.data.user;
        setUser(userData);
        localStorage.setItem("farmazon_user", JSON.stringify(userData));
      } else {
        throw new Error(response.data.message || 'Login failed: Invalid response from server');
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      throw new Error(errorMessage); 
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, type: "customer" | "farmer") => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        type,
      }

      setUser(mockUser)
      localStorage.setItem("farmazon_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("farmazon_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}