/**
 * Supabase Browser Client for Client Components.
 *
 * Uses @supabase/ssr with httpOnly cookie storage.
 * The browser client uses document.cookie for storage while keeping cookies
 * accessible to the browser (not httpOnly for client-side readable cookies).
 *
 * For true httpOnly cookies, the server-side handles authentication through
 * the middleware and server components.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase/client'
 *   const { data } = await supabase.auth.getUser()
 */

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!url || !key) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Creates a Supabase client for Client Components.
 * Uses cookie storage compatible with httpOnly pattern.
 */
export function createClient(): SupabaseClient {
  return createBrowserClient(url, key, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: {
        getItem: (key: string) => {
          if (typeof document === 'undefined') return null
          const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)'))
          return match ? decodeURIComponent(match[2]) : null
        },
        setItem: (key: string, value: string) => {
          if (typeof document === 'undefined') return
          const expires = new Date()
          expires.setFullYear(expires.getFullYear() + 1)
          document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
        },
        removeItem: (key: string) => {
          if (typeof document === 'undefined') return
          document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`
        },
      },
    },
  })
}

// Export singleton for backward compatibility
export const supabase = createClient()
