import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for server-side operations
 *
 * Uses service role key for admin operations (bypasses RLS)
 * Only use this in API routes, never expose to client
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Supabase client for client-side operations
 *
 * Uses anon key - respects RLS policies
 */
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Database types based on schema
 */

export interface Applicant {
  id: string;
  full_name: string | null;
  email: string;
  company_name: string | null;
  website: string | null;
  created_at: string;
}

export interface Application {
  id: string;
  applicant_id: string;
  stage: string | null;
  users_count: number | null;
  actively_building: boolean | null;
  urgency: string | null;
  biggest_problem: string | null;
  problem_area: string | null;
  attempted_solutions: string | null;
  consequence_if_unsolved: string | null;
  desired_outcome: string | null;
  success_7_14_days: string | null;
  willing_to_collaborate: boolean | null;
  can_provide_access: boolean | null;
  reason_for_rivtor: string | null;
  payment_intent: string | null;
  execution_gap: string | null;
  intent_type: string | null;
  created_at: string;
}

export interface ApplicationScore {
  id: string;
  application_id: string;
  stage_score: number | null;
  urgency_score: number | null;
  problem_score: number | null;
  action_score: number | null;
  collaboration_score: number | null;
  access_score: number | null;
  outcome_score: number | null;
  payment_score: number | null;
  total_score: number | null;
  priority_level: string | null;
  auto_reject: boolean;
  created_at: string;
}

export interface ApplicationStatus {
  id: string;
  application_id: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'call_scheduled' | 'accepted' | 'rejected';
  decision_reason: string | null;
  reviewed_by: string | null;
  updated_at: string;
}

export interface ApplicationEvent {
  id: string;
  application_id: string;
  event_type: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
