/**
 * @deprecated Use createClient from '@/lib/supabase/client' or '@/lib/supabase/server' instead.
 * This file is kept for backward compatibility but will be removed.
 *
 * New usage:
 *   - Client Components: import { createClient } from '@/lib/supabase/client'
 *   - Server Components: import { createClient } from '@/lib/supabase/server'
 *
 * This now exports the shared client from supabase/client to ensure
 * consistent cookie handling across the application.
 */

// Export the shared client from supabase/client
export { supabase, createClient } from './supabase/client'
