-- Migration: Enable Row Level Security (RLS) and create policies
-- This migration secures the database with proper RLS policies

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_events ENABLE ROW LEVEL SECURITY;


-- ============================================================================
-- APPLICANTS TABLE POLICIES
-- ============================================================================

-- Service role (admin) can do everything
CREATE POLICY "Service role can manage all applicants"
ON applicants
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anon users can insert applicants (for new applications)
CREATE POLICY "Anon users can insert applicants"
ON applicants
FOR INSERT
TO anon
WITH CHECK (true);

-- Anon users can read applicants by email (to check if they exist)
CREATE POLICY "Anon users can read applicants by email"
ON applicants
FOR SELECT
TO anon
USING (email = current_setting('request.jwt.claim.email', true));

-- Authenticated users can read their own applicant records
CREATE POLICY "Users can read own applicants"
ON applicants
FOR SELECT
TO authenticated
USING (email = auth.jwt() ->> 'email');


-- ============================================================================
-- APPLICATIONS TABLE POLICIES
-- ============================================================================

-- Service role can do everything
CREATE POLICY "Service role can manage all applications"
ON applications
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anon users can insert applications (for new submissions)
CREATE POLICY "Anon users can insert applications"
ON applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Anon users can read their own applications (after submission)
CREATE POLICY "Anon users can read own applications by applicant_id"
ON applications
FOR SELECT
TO anon
USING (
  applicant_id IN (
    SELECT id FROM applicants
    WHERE email = current_setting('request.jwt.claim.email', true)
  )
);

-- Authenticated users can read their own applications
CREATE POLICY "Users can read own applications"
ON applications
FOR SELECT
TO authenticated
USING (
  applicant_id IN (
    SELECT id FROM applicants
    WHERE email = auth.jwt() ->> 'email'
  )
);


-- ============================================================================
-- APPLICATION_SCORES TABLE POLICIES
-- ============================================================================

-- Service role can do everything
CREATE POLICY "Service role can manage all application_scores"
ON application_scores
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anon users can insert scores (created automatically on submission)
CREATE POLICY "Anon users can insert application_scores"
ON application_scores
FOR INSERT
TO anon
WITH CHECK (true);

-- Anon users can read their own scores
CREATE POLICY "Anon users can read own application_scores"
ON application_scores
FOR SELECT
TO anon
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = current_setting('request.jwt.claim.email', true)
    )
  )
);

-- Authenticated users can read their own scores
CREATE POLICY "Users can read own application_scores"
ON application_scores
FOR SELECT
TO authenticated
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = auth.jwt() ->> 'email'
    )
  )
);


-- ============================================================================
-- APPLICATION_STATUS TABLE POLICIES
-- ============================================================================

-- Service role can do everything
CREATE POLICY "Service role can manage all application_status"
ON application_status
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anon users can insert status (created automatically on submission)
CREATE POLICY "Anon users can insert application_status"
ON application_status
FOR INSERT
TO anon
WITH CHECK (true);

-- Anon users can read their own status
CREATE POLICY "Anon users can read own application_status"
ON application_status
FOR SELECT
TO anon
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = current_setting('request.jwt.claim.email', true)
    )
  )
);

-- Authenticated users can read their own status
CREATE POLICY "Users can read own application_status"
ON application_status
FOR SELECT
TO authenticated
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = auth.jwt() ->> 'email'
    )
  )
);


-- ============================================================================
-- APPLICATION_EVENTS TABLE POLICIES
-- ============================================================================

-- Service role can do everything
CREATE POLICY "Service role can manage all application_events"
ON application_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Anon users can insert events (created automatically on actions)
CREATE POLICY "Anon users can insert application_events"
ON application_events
FOR INSERT
TO anon
WITH CHECK (true);

-- Anon users can read their own events
CREATE POLICY "Anon users can read own application_events"
ON application_events
FOR SELECT
TO anon
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = current_setting('request.jwt.claim.email', true)
    )
  )
);

-- Authenticated users can read their own events
CREATE POLICY "Users can read own application_events"
ON application_events
FOR SELECT
TO authenticated
USING (
  application_id IN (
    SELECT id FROM applications
    WHERE applicant_id IN (
      SELECT id FROM applicants
      WHERE email = auth.jwt() ->> 'email'
    )
  )
);


-- ============================================================================
-- CREATE SECURITY DEFINED FUNCTIONS (for admin access)
-- ============================================================================

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user has admin role (you can customize this logic)
  RETURN EXISTS (
    SELECT 1
    FROM pg_roles
    WHERE rolname = current_user
    AND rolname = 'postgres'
  );
END;
$$;

-- Grant execute on is_admin to public
GRANT EXECUTE ON FUNCTION is_admin() TO public;


-- ============================================================================
-- CREATE VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: applications_with_scores (combines application with score and status)
CREATE OR REPLACE VIEW applications_with_scores AS
SELECT
  a.id as application_id,
  a.applicant_id,
  a.stage,
  a.users_count,
  a.actively_building,
  a.urgency,
  a.biggest_problem,
  a.problem_area,
  a.attempted_solutions,
  a.consequence_if_unsolved,
  a.desired_outcome,
  a.success_7_14_days,
  a.willing_to_collaborate,
  a.can_provide_access,
  a.reason_for_rivtor,
  a.payment_intent,
  a.execution_gap,
  a.intent_type,
  a.created_at as application_created_at,
  appl.full_name,
  appl.email,
  appl.company_name,
  appl.website,
  s.total_score,
  s.priority_level,
  s.auto_reject,
  st.status,
  st.decision_reason,
  st.updated_at as status_updated_at
FROM applications a
JOIN applicants appl ON a.applicant_id = appl.id
LEFT JOIN application_scores s ON a.id = s.application_id
LEFT JOIN application_status st ON a.id = st.application_id;

COMMENT ON VIEW applications_with_scores IS 'Combined view of applications with applicant details, scores, and status';


-- View: high_priority_applications (for quick access to top leads)
CREATE OR REPLACE VIEW high_priority_applications AS
SELECT
  a.id as application_id,
  appl.full_name,
  appl.email,
  appl.company_name,
  appl.website,
  a.stage,
  a.urgency,
  a.biggest_problem,
  a.intent_type,
  s.total_score,
  s.priority_level,
  st.status,
  a.created_at
FROM applications a
JOIN applicants appl ON a.applicant_id = appl.id
JOIN application_scores s ON a.id = s.application_id
JOIN application_status st ON a.id = st.application_id
WHERE s.priority_level = 'high'
  AND st.status IN ('new', 'reviewing', 'shortlisted')
ORDER BY s.total_score DESC, a.created_at DESC;

COMMENT ON VIEW high_priority_applications IS 'High priority applications that need attention';


-- View: rejected_applications (for analysis)
CREATE OR REPLACE VIEW rejected_applications AS
SELECT
  a.id as application_id,
  appl.full_name,
  appl.email,
  appl.company_name,
  a.stage,
  a.urgency,
  a.biggest_problem,
  a.intent_type,
  s.total_score,
  s.priority_level,
  s.auto_reject,
  st.decision_reason,
  a.created_at
FROM applications a
JOIN applicants appl ON a.applicant_id = appl.id
JOIN application_scores s ON a.id = s.application_id
JOIN application_status st ON a.id = st.application_id
WHERE st.status = 'rejected'
ORDER BY a.created_at DESC;

COMMENT ON VIEW rejected_applications IS 'Rejected applications for analysis';
