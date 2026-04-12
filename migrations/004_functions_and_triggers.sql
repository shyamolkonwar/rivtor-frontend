-- Migration: Create helper functions and triggers
-- This migration adds utility functions and triggers for the application system

-- ============================================================================
-- FUNCTION: Calculate application score
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_application_score(
  p_stage TEXT,
  p_actively_building BOOLEAN,
  p_urgency TEXT,
  p_biggest_problem TEXT,
  p_attempted_solutions TEXT,
  p_willing_to_collaborate BOOLEAN,
  p_can_provide_access BOOLEAN,
  p_desired_outcome TEXT,
  p_payment_intent TEXT,
  p_intent_type TEXT
)
RETURNS TABLE (
  stage_score INTEGER,
  urgency_score INTEGER,
  problem_score INTEGER,
  action_score INTEGER,
  collaboration_score INTEGER,
  access_score INTEGER,
  outcome_score INTEGER,
  payment_score INTEGER,
  total_score INTEGER,
  priority_level TEXT,
  auto_reject BOOLEAN
) LANGUAGE plpgsql AS $$
DECLARE
  v_stage_score INTEGER := 0;
  v_urgency_score INTEGER := 0;
  v_problem_score INTEGER := 0;
  v_action_score INTEGER := 0;
  v_collaboration_score INTEGER := 0;
  v_access_score INTEGER := 0;
  v_outcome_score INTEGER := 0;
  v_payment_score INTEGER := 0;
  v_total_score INTEGER := 0;
  v_priority_level TEXT := 'low';
  v_auto_reject BOOLEAN := FALSE;
BEGIN
  -- Stage scoring
  CASE p_stage
    WHEN 'revenue' THEN v_stage_score := 3;
    WHEN 'early_users' THEN v_stage_score := 2;
    WHEN 'mvp' THEN v_stage_score := 1;
    WHEN 'idea' THEN v_stage_score := 0;
    ELSE v_stage_score := 0;
  END CASE;

  -- Actively building
  IF p_actively_building = TRUE THEN
    v_collaboration_score := v_collaboration_score + 2;
  END IF;

  -- Urgency scoring
  CASE p_urgency
    WHEN 'urgent' THEN v_urgency_score := 3;
    WHEN 'important' THEN v_urgency_score := 2;
    WHEN 'not_urgent' THEN v_urgency_score := 0;
    ELSE v_urgency_score := 0;
  END CASE;

  -- Problem quality (based on length)
  IF LENGTH(p_biggest_problem) > 50 THEN
    v_problem_score := 3;
  ELSIF LENGTH(p_biggest_problem) > 20 THEN
    v_problem_score := 1;
  END IF;

  -- Action taken (based on length)
  IF LENGTH(p_attempted_solutions) > 50 THEN
    v_action_score := 2;
  ELSIF LENGTH(p_attempted_solutions) > 20 THEN
    v_action_score := 1;
  END IF;

  -- Collaboration scoring
  IF p_willing_to_collaborate = TRUE THEN
    v_collaboration_score := v_collaboration_score + 3;
  END IF;

  -- Access scoring
  IF p_can_provide_access = TRUE THEN
    v_access_score := 2;
  END IF;

  -- Outcome clarity (based on length)
  IF LENGTH(p_desired_outcome) > 80 THEN
    v_outcome_score := 3;
  ELSIF LENGTH(p_desired_outcome) > 30 THEN
    v_outcome_score := 1;
  END IF;

  -- Payment intent
  CASE p_payment_intent
    WHEN 'yes' THEN v_payment_score := 2;
    WHEN 'maybe' THEN v_payment_score := 1;
    WHEN 'no' THEN v_payment_score := 0;
    ELSE v_payment_score := 0;
  END CASE;

  -- Calculate total
  v_total_score := v_stage_score + v_urgency_score + v_problem_score +
                  v_action_score + v_collaboration_score + v_access_score +
                  v_outcome_score + v_payment_score;

  -- Determine priority level
  IF v_total_score >= 10 THEN
    v_priority_level := 'high';
  ELSIF v_total_score >= 6 THEN
    v_priority_level := 'medium';
  ELSE
    v_priority_level := 'low';
  END IF;

  -- Auto-reject conditions
  v_auto_reject := NOT p_actively_building
                  OR p_urgency = 'not_urgent'
                  OR NOT p_willing_to_collaborate
                  OR NOT p_can_provide_access;

  -- Intent type filter
  IF p_intent_type = 'design_partner' THEN
    v_total_score := v_total_score + 2;
  ELSIF p_intent_type = 'explore' THEN
    v_total_score := v_total_score - 1;
  ELSIF p_intent_type = 'unsure' THEN
    v_total_score := v_total_score - 2;
  END IF;

  -- Recalculate priority after intent adjustment
  IF v_total_score >= 10 THEN
    v_priority_level := 'high';
  ELSIF v_total_score >= 6 THEN
    v_priority_level := 'medium';
  ELSE
    v_priority_level := 'low';
  END IF;

  RETURN QUERY SELECT
    v_stage_score,
    v_urgency_score,
    v_problem_score,
    v_action_score,
    v_collaboration_score,
    v_access_score,
    v_outcome_score,
    v_payment_score,
    v_total_score,
    v_priority_level,
    v_auto_reject;
END;
$$;

COMMENT ON FUNCTION calculate_application_score IS 'Calculate application score based on various criteria';


-- ============================================================================
-- FUNCTION: Get or create applicant
-- ============================================================================

CREATE OR REPLACE FUNCTION get_or_create_applicant(
  p_full_name TEXT,
  p_email TEXT,
  p_company_name TEXT DEFAULT NULL,
  p_website TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_applicant_id UUID;
BEGIN
  -- Try to find existing applicant
  SELECT id INTO v_applicant_id
  FROM applicants
  WHERE email = p_full_name
  LIMIT 1;

  -- If not found, create new applicant
  IF v_applicant_id IS NULL THEN
    INSERT INTO applicants (full_name, email, company_name, website)
    VALUES (p_full_name, p_email, p_company_name, p_website)
    RETURNING id INTO v_applicant_id;
  END IF;

  RETURN v_applicant_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_or_create_applicant IS 'Get existing applicant by email or create new one';


-- ============================================================================
-- FUNCTION: Create application with score and status
-- ============================================================================

CREATE OR REPLACE FUNCTION submit_application(
  p_applicant_id UUID,
  p_stage TEXT,
  p_users_count INTEGER,
  p_actively_building BOOLEAN,
  p_urgency TEXT,
  p_biggest_problem TEXT,
  p_problem_area TEXT,
  p_attempted_solutions TEXT,
  p_consequence_if_unsolved TEXT,
  p_desired_outcome TEXT,
  p_success_7_14_days TEXT,
  p_willing_to_collaborate BOOLEAN,
  p_can_provide_access BOOLEAN,
  p_reason_for_rivtor TEXT,
  p_payment_intent TEXT,
  p_execution_gap TEXT,
  p_intent_type TEXT
)
RETURNS JSON AS $$
DECLARE
  v_application_id UUID;
  v_score_data RECORD;
  v_initial_status TEXT := 'new';
  v_decision_reason TEXT := NULL;
BEGIN
  -- Create application
  INSERT INTO applications (
    applicant_id, stage, users_count, actively_building, urgency,
    biggest_problem, problem_area, attempted_solutions, consequence_if_unsolved,
    desired_outcome, success_7_14_days, willing_to_collaborate, can_provide_access,
    reason_for_rivtor, payment_intent, execution_gap, intent_type
  )
  VALUES (
    p_applicant_id, p_stage, p_users_count, p_actively_building, p_urgency,
    p_biggest_problem, p_problem_area, p_attempted_solutions, p_consequence_if_unsolved,
    p_desired_outcome, p_success_7_14_days, p_willing_to_collaborate, p_can_provide_access,
    p_reason_for_rivtor, p_payment_intent, p_execution_gap, p_intent_type
  )
  RETURNING id INTO v_application_id;

  -- Calculate score
  SELECT * INTO v_score_data
  FROM calculate_application_score(
    p_stage, p_actively_building, p_urgency, p_biggest_problem,
    p_attempted_solutions, p_willing_to_collaborate, p_can_provide_access,
    p_desired_outcome, p_payment_intent, p_intent_type
  );

  -- Create score record
  INSERT INTO application_scores (
    application_id, stage_score, urgency_score, problem_score, action_score,
    collaboration_score, access_score, outcome_score, payment_score,
    total_score, priority_level, auto_reject
  )
  VALUES (
    v_application_id, v_score_data.stage_score, v_score_data.urgency_score,
    v_score_data.problem_score, v_score_data.action_score,
    v_score_data.collaboration_score, v_score_data.access_score,
    v_score_data.outcome_score, v_score_data.payment_score,
    v_score_data.total_score, v_score_data.priority_level, v_score_data.auto_reject
  );

  -- Determine initial status
  IF v_score_data.auto_reject THEN
    v_initial_status := 'rejected';
    v_decision_reason := 'Does not meet criteria';
  ELSIF v_score_data.priority_level = 'high' THEN
    v_initial_status := 'shortlisted';
  ELSIF v_score_data.priority_level = 'medium' THEN
    v_initial_status := 'reviewing';
  ELSE
    v_initial_status := 'rejected';
    v_decision_reason := 'Low score';
  END IF;

  -- Create status record
  INSERT INTO application_status (application_id, status, decision_reason)
  VALUES (v_application_id, v_initial_status, v_decision_reason);

  -- Log submission event
  INSERT INTO application_events (application_id, event_type, metadata)
  VALUES (
    v_application_id,
    'submitted',
    jsonb_build_object(
      'score', v_score_data.total_score,
      'priority', v_score_data.priority_level,
      'auto_reject', v_score_data.auto_reject
    )
  );

  -- Return result as JSON
  RETURN jsonb_build_object(
    'applicationId', v_application_id,
    'score', v_score_data.total_score,
    'priority', v_score_data.priority_level,
    'status', v_initial_status,
    'autoReject', v_score_data.auto_reject
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION submit_application IS 'Complete application submission flow with scoring and status assignment';


-- ============================================================================
-- FUNCTION: Get application summary (for quick views)
-- ============================================================================

CREATE OR REPLACE FUNCTION get_application_summary(p_application_id UUID)
RETURNS TABLE (
  application_id UUID,
  full_name TEXT,
  email TEXT,
  company_name TEXT,
  stage TEXT,
  urgency TEXT,
  total_score INTEGER,
  priority_level TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    appl.full_name,
    appl.email,
    appl.company_name,
    a.stage,
    a.urgency,
    s.total_score,
    s.priority_level,
    st.status,
    a.created_at
  FROM applications a
  JOIN applicants appl ON a.applicant_id = appl.id
  LEFT JOIN application_scores s ON a.id = s.application_id
  LEFT JOIN application_status st ON a.id = st.application_id
  WHERE a.id = p_application_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_application_summary IS 'Get summary of an application with all key details';


-- ============================================================================
-- FUNCTION: Get dashboard stats (for admin dashboard)
-- ============================================================================

CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  v_total_applications INTEGER;
  v_new_applications INTEGER;
  v_reviewing_applications INTEGER;
  v_shortlisted_applications INTEGER;
  v_rejected_applications INTEGER;
  v_high_priority_count INTEGER;
  v_avg_score NUMERIC;
BEGIN
  -- Count by status
  SELECT COUNT(*) INTO v_total_applications FROM applications;
  SELECT COUNT(*) INTO v_new_applications FROM application_status WHERE status = 'new';
  SELECT COUNT(*) INTO v_reviewing_applications FROM application_status WHERE status = 'reviewing';
  SELECT COUNT(*) INTO v_shortlisted_applications FROM application_status WHERE status = 'shortlisted';
  SELECT COUNT(*) INTO v_rejected_applications FROM application_status WHERE status = 'rejected';

  -- High priority count
  SELECT COUNT(*) INTO v_high_priority_count
  FROM application_scores
  WHERE priority_level = 'high' AND auto_reject = false;

  -- Average score
  SELECT COALESCE(AVG(total_score), 0) INTO v_avg_score FROM application_scores;

  RETURN jsonb_build_object(
    'totalApplications', v_total_applications,
    'newApplications', v_new_applications,
    'reviewingApplications', v_reviewing_applications,
    'shortlistedApplications', v_shortlisted_applications,
    'rejectedApplications', v_rejected_applications,
    'highPriorityCount', v_high_priority_count,
    'averageScore', v_avg_score
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_dashboard_stats IS 'Get overall statistics for admin dashboard';


-- ============================================================================
-- TRIGGER: Auto-create score and status on application insert
-- ============================================================================

-- Function to handle application insert trigger
CREATE OR REPLACE FUNCTION handle_application_insert()
RETURNS TRIGGER AS $$
DECLARE
  v_score_data RECORD;
  v_initial_status TEXT := 'new';
  v_decision_reason TEXT := NULL;
BEGIN
  -- Calculate score
  SELECT * INTO v_score_data
  FROM calculate_application_score(
    NEW.stage,
    NEW.actively_building,
    NEW.urgency,
    NEW.biggest_problem,
    NEW.attempted_solutions,
    NEW.willing_to_collaborate,
    NEW.can_provide_access,
    NEW.desired_outcome,
    NEW.payment_intent,
    NEW.intent_type
  );

  -- Create score record
  INSERT INTO application_scores (
    application_id, stage_score, urgency_score, problem_score, action_score,
    collaboration_score, access_score, outcome_score, payment_score,
    total_score, priority_level, auto_reject
  )
  VALUES (
    NEW.id, v_score_data.stage_score, v_score_data.urgency_score,
    v_score_data.problem_score, v_score_data.action_score,
    v_score_data.collaboration_score, v_score_data.access_score,
    v_score_data.outcome_score, v_score_data.payment_score,
    v_score_data.total_score, v_score_data.priority_level, v_score_data.auto_reject
  );

  -- Determine initial status
  IF v_score_data.auto_reject THEN
    v_initial_status := 'rejected';
    v_decision_reason := 'Does not meet criteria';
  ELSIF v_score_data.priority_level = 'high' THEN
    v_initial_status := 'shortlisted';
  ELSIF v_score_data.priority_level = 'medium' THEN
    v_initial_status := 'reviewing';
  ELSE
    v_initial_status := 'rejected';
    v_decision_reason := 'Low score';
  END IF;

  -- Create status record
  INSERT INTO application_status (application_id, status, decision_reason)
  VALUES (NEW.id, v_initial_status, v_decision_reason);

  -- Log submission event
  INSERT INTO application_events (application_id, event_type, metadata)
  VALUES (
    NEW.id,
    'submitted',
    jsonb_build_object(
      'score', v_score_data.total_score,
      'priority', v_score_data.priority_level,
      'auto_reject', v_score_data.auto_reject
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger (optional - can be enabled if you want automatic scoring)
-- DROP TRIGGER IF EXISTS trigger_application_auto_score ON applications;
-- CREATE TRIGGER trigger_application_auto_score
--   AFTER INSERT ON applications
--   FOR EACH ROW
--   EXECUTE FUNCTION handle_application_insert();

COMMENT ON FUNCTION handle_application_insert IS 'Automatically create score, status, and event records when application is inserted';


-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION calculate_application_score TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_or_create_applicant TO service_role;
GRANT EXECUTE ON FUNCTION submit_application TO service_role;
GRANT EXECUTE ON FUNCTION get_application_summary TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_dashboard_stats TO service_role;

-- Grant select on views
GRANT SELECT ON applications_with_scores TO service_role;
GRANT SELECT ON high_priority_applications TO service_role;
GRANT SELECT ON rejected_applications TO service_role;
