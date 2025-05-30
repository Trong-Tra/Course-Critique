"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthResponse, LoginRequest, CreateUserRequest } from '@/types/api'
import { authApi } from '@/lib/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginRequest) => Promise<AuthResponse>
  register: (userData: CreateUserRequest) => Promise<AuthResponse>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const response = await authApi.getProfile()
          if (response.success && response.data) {
            setUser(response.data)
          } else {
            localStorage.removeItem('auth_token')
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        localStorage.removeItem('auth_token')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await authApi.login(credentials)
      
      if (response.success && response.user && response.token) {
        setUser(response.user)
        localStorage.setItem('auth_token', response.token)
      }
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData: CreateUserRequest): Promise<AuthResponse> => {
    try {
      const response = await authApi.register(userData)
      
      if (response.success && response.user) {
        // Note: Registration doesn't auto-login, user needs to login separately
        // You could modify this to auto-login if desired
      }
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_token')
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
