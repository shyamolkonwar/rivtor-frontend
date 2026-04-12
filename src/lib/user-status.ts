/**
 * User Status Utility
 *
 * DEPRECATED: This file provides compatibility for old code.
 * New code should use the billing API directly via @/lib/api.
 *
 * This now uses the backend API instead of client-side logic.
 */

import { billingApi, authApi } from './api'

export interface UserStatus {
  isLoggedIn: boolean
  hasCompletedOnboarding: boolean
  hasPaid: boolean
  subscriptionStatus: string | null
  neuBalance: number
  isTrialUser: boolean
  trialEndsAt: string | null
}

/**
 * Get user status from backend.
 * This replaces the old client-side implementation.
 *
 * Uses shared Supabase client to ensure proper cookie handling.
 * Adds retry logic for session initialization race conditions.
 */
export async function getUserStatus(): Promise<UserStatus> {
  const maxRetries = 3;
  const retryDelay = 100; // ms

  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      // Use the shared supabase client from lib/supabase for consistent cookie handling
      const { supabase } = await import('./supabase/client')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('[UserStatus] Session error:', sessionError);
      }

      if (!session) {
        if (retry < maxRetries - 1) {
          // Session might still be initializing, wait and retry
          await new Promise(resolve => setTimeout(resolve, retryDelay * (retry + 1)))
          continue
        }
        return {
          isLoggedIn: false,
          hasCompletedOnboarding: false,
          hasPaid: false,
          subscriptionStatus: null,
          neuBalance: 0,
          isTrialUser: false,
          trialEndsAt: null,
        }
      }

      // Get auth status from backend
      const authStatus = await authApi.getStatus(session.access_token)

      // Get billing status from backend
      const billingData = await billingApi.getBalance()

      return {
        isLoggedIn: true,
        hasCompletedOnboarding: authStatus.onboarding_completed || false,
        hasPaid: ['active', 'trialing', 'premium'].includes(authStatus.subscription?.status || 'inactive'),
        subscriptionStatus: authStatus.subscription?.status || null,
        neuBalance: billingData.neu_balance || 0,
        isTrialUser: authStatus.subscription?.status === 'trialing',
        trialEndsAt: authStatus.subscription?.trial_end || null,
      }
    } catch (error) {
      console.error('[UserStatus] Error on attempt', retry + 1, ':', error)
      if (retry === maxRetries - 1) {
        // Last attempt failed, return safe defaults
        return {
          isLoggedIn: true, // Assume logged in to avoid unnecessary redirects
          hasCompletedOnboarding: false,
          hasPaid: false,
          subscriptionStatus: null,
          neuBalance: 0,
          isTrialUser: false,
          trialEndsAt: null,
        }
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * (retry + 1)))
    }
  }

  // Fallback (should never reach here)
  return {
    isLoggedIn: true,
    hasCompletedOnboarding: false,
    hasPaid: false,
    subscriptionStatus: null,
    neuBalance: 0,
    isTrialUser: false,
    trialEndsAt: null,
  }
}

/**
 * Mark onboarding as complete.
 * Calls the backend API to update user's onboarding status.
 */
export async function markOnboardingComplete(): Promise<void> {
  const { supabase } = await import('./supabase/client')
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('No auth session')
  }

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' ? 'http://localhost:8000' : 'http://backend:8000')

    const response = await fetch(`${apiUrl}/api/v1/onboarding/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: session.access_token }),
      credentials: 'include',
    })

    if (!response.ok) {
      console.error('Failed to mark onboarding complete:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error marking onboarding complete:', error)
    throw error
  }
}
