"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from './supabase';
import { authApi } from './api';
import { setAccessToken, clearAccessToken } from './auth/token-store';
import type { Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  subscription_status?: string;
  onboarding_completed: boolean;
  neu_balance?: number;
  permissions?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  refreshUser: async () => {},
  signOut: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  serverSession: Session | null;
}

export function AuthProvider({ children, serverSession }: AuthProviderProps) {
  // Initialize with server session data (no loading state needed initially)
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (serverSession?.user) {
      return {
        id: serverSession.user.id,
        email: serverSession.user.email || '',
        full_name: serverSession.user.user_metadata?.full_name || serverSession.user.user_metadata?.name || '',
        role: 'member',
        subscription_status: 'trialing',
        onboarding_completed: false,
        neu_balance: 50,
        permissions: [],
      };
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false); // Start with false since we have server data
  const [sessionCheckDone, setSessionCheckDone] = useState(!!serverSession);

  // 1. IMMEDIATELY set the access token from server session
  // This happens before any renders, so API calls will have the token
  useEffect(() => {
    if (serverSession?.access_token) {
      setAccessToken(serverSession.access_token);
    } else {
      clearAccessToken();
    }
  }, [serverSession?.access_token]);

  // Core function to fetch user state from backend
  const refreshUser = useCallback(async (isInitial: boolean = false) => {
    // If we have server session, use it immediately (no need to fetch from browser)
    if (serverSession) {
      // Sync with backend in background
      try {
        const backendUser = await authApi.sync(serverSession.access_token);
        setUser(backendUser);
        if (typeof localStorage !== 'undefined') {
          try {
            localStorage.setItem('auth_user', JSON.stringify(backendUser));
          } catch (e) {
            // Silent fail - localStorage might be disabled
          }
        }
      } catch (syncError) {
        // Use server session as fallback
        const fallbackUser = {
          id: serverSession.user.id,
          email: serverSession.user.email || '',
          full_name: serverSession.user.user_metadata?.full_name || serverSession.user.user_metadata?.name || '',
          role: 'member',
          subscription_status: 'trialing',
          onboarding_completed: false,
          neu_balance: 50,
          permissions: [],
        };
        setUser(fallbackUser);
      }
      setSessionCheckDone(true);
      setIsLoading(false);
      return;
    }

    // No server session, try to get from browser (for OAuth callback scenarios)
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        setUser(null);
        setSessionCheckDone(true);
        setIsLoading(false);
        return;
      }

      if (!session) {
        // Try localStorage cache as last resort
        if (typeof localStorage !== 'undefined') {
          try {
            const cachedUser = localStorage.getItem('auth_user');
            if (cachedUser) {
              setUser(JSON.parse(cachedUser));
            } else {
              setUser(null);
            }
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setSessionCheckDone(true);
        setIsLoading(false);
        return;
      }

      // Sync browser session with backend
      try {
        const backendUser = await authApi.sync(session.access_token);
        setUser(backendUser);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(backendUser));
        }
      } catch (syncError) {
        const fallbackUser = {
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          role: 'member',
          subscription_status: 'trialing',
          onboarding_completed: false,
          neu_balance: 50,
          permissions: [],
        };
        setUser(fallbackUser);
      }
      setSessionCheckDone(true);
    } catch (err) {
      setUser(null);
      setSessionCheckDone(true);
    } finally {
      setIsLoading(false);
    }
  }, [serverSession]);

  // 1. Run on initial mount (but skip if we already have server session)
  useEffect(() => {
    if (serverSession) {
      // Already initialized from server, just sync with backend
      setIsLoading(true);
      refreshUser(true);
    } else {
      // No server session, check browser
      setIsLoading(true);
      refreshUser(true);
    }

    // 2. Listen for Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Update the in-memory token when session changes
          if (session?.access_token) {
            setAccessToken(session.access_token);
          }
          await refreshUser(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          clearAccessToken(); // Clear token from memory
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('auth_user');
          }
          setIsLoading(false);
          setSessionCheckDone(true);
        } else if (event === 'INITIAL_SESSION') {
          await refreshUser(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshUser, serverSession]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    clearAccessToken(); // Clear token from memory
    setSessionCheckDone(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      refreshUser,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
