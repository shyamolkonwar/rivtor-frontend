-- Migration: Create core tables for application system
-- This migration creates all tables needed for the design partner application flow

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: applicants (WHO)
-- ============================================================================
-- Stores applicant information - people who submit applications
-- One applicant can have multiple applications over time

CREATE TABLE IF NOT EXISTS applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  email TEXT NOT NULL UNIQUE,
  company_name TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT appplicants_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Add comments for documentation
COMMENT ON TABLE applicants IS 'Core applicant information - people who submit applications';
COMMENT ON COLUMN applicants.id IS 'Unique identifier for the applicant';
COMMENT ON COLUMN applicants.full_name IS 'Applicant full name';
COMMENT ON COLUMN applicants.email IS 'Applicants email address (must be unique)';
COMMENT ON COLUMN applicants.company_name IS 'Name of the applicant company';
COMMENT ON COLUMN applicants.website IS 'Company website URL';
COMMENT ON COLUMN applicants.created_at IS 'Timestamp when the applicant record was created';


-- ============================================================================
-- TABLE: applications (MAIN ENTITY)
-- ============================================================================
-- One submission = one application
-- Stores all form responses from the application

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,

  -- Context
  stage TEXT,
  users_count INTEGER,

  -- Building status
  actively_building BOOLEAN,

  -- Urgency
  urgency TEXT,

  -- Problem details
  biggest_problem TEXT,
  problem_area TEXT,

  -- Action taken
  attempted_solutions TEXT,

  -- Consequences
  consequence_if_unsolved TEXT,

  -- Outcomes
  desired_outcome TEXT,
  success_7_14_days TEXT,

  -- Collaboration
  willing_to_collaborate BOOLEAN,
  can_provide_access BOOLEAN,

  -- Intent
  reason_for_rivtor TEXT,
  payment_intent TEXT,

  -- Execution gap
  execution_gap TEXT,

  -- Intent type
  intent_type TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT applications_stage_check CHECK (stage IN ('idea', 'mvp', 'early_users', 'revenue')),
  CONSTRAINT applications_urgency_check CHECK (urgency IN ('not_urgent', 'important', 'urgent')),
  CONSTRAINT applications_problem_area_check CHECK (problem_area IN ('acquisition', 'onboarding', 'conversion', 'ops', 'unknown')),
  CONSTRAINT applications_payment_intent_check CHECK (payment_intent IN ('yes', 'maybe', 'no')),
  CONSTRAINT applications_intent_type_check CHECK (intent_type IN ('design_partner', 'explore', 'unsure'))
);

-- Add comments for documentation
COMMENT ON TABLE applications IS 'Application submissions - one row per form submission';
COMMENT ON COLUMN applications.applicant_id IS 'Reference to the applicant who submitted';
COMMENT ON COLUMN applications.stage IS 'Current stage of the product';
COMMENT ON COLUMN applications.users_count IS 'Number of users/customers';
COMMENT ON COLUMN applications.actively_building IS 'Whether the applicant is actively building';
COMMENT ON COLUMN applications.urgency IS 'How urgent the problem is';
COMMENT ON COLUMN applications.biggest_problem IS 'Description of the biggest problem';
COMMENT ON COLUMN applications.problem_area IS 'Area where the problem exists';
COMMENT ON COLUMN applications.attempted_solutions IS 'What solutions have been tried';
COMMENT ON COLUMN applications.consequence_if_unsolved IS 'What happens if problem isnot solved';
COMMENT ON COLUMN applications.desired_outcome IS 'What outcome would make this a no-brainer';
COMMENT ON COLUMN applications.success_7_14_days IS 'What success looks like in 7-14 days';
COMMENT ON COLUMN applications.willing_to_collaborate IS 'Willing to actively collaborate';
COMMENT ON COLUMN applications.can_provide_access IS 'Willing to give Rivtor access to systems';
COMMENT ON COLUMN applications.reason_for_rivtor IS 'Why the applicant wants to work with Rivtor';
COMMENT ON COLUMN applications.payment_intent IS 'Open to paid engagement';
COMMENT ON COLUMN applications.execution_gap IS 'What they want to execute faster';
COMMENT ON COLUMN applications.intent_type IS 'Type of intent (design partner, explore, unsure)';


-- ============================================================================
-- TABLE: application_scores (SYSTEM INTELLIGENCE)
-- ============================================================================
-- Keep scoring separate (VERY IMPORTANT)
-- Calculated scores for each application

CREATE TABLE IF NOT EXISTS application_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,

  -- Individual scores
  stage_score INTEGER,
  urgency_score INTEGER,
  problem_score INTEGER,
  action_score INTEGER,
  collaboration_score INTEGER,
  access_score INTEGER,
  outcome_score INTEGER,
  payment_score INTEGER,

  -- Total and routing
  total_score INTEGER,
  priority_level TEXT,

  -- Auto-reject flag
  auto_reject BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT application_scores_priority_level_check CHECK (priority_level IN ('high', 'medium', 'low')),
  CONSTRAINT application_scores_total_score_check CHECK (total_score >= 0),
  CONSTRAINT application_scores_individual_scores_check CHECK (
    stage_score >= 0 AND
    urgency_score >= 0 AND
    problem_score >= 0 AND
    action_score >= 0 AND
    collaboration_score >= 0 AND
    access_score >= 0 AND
    outcome_score >= 0 AND
    payment_score >= 0
  )
);

-- Add comments for documentation
COMMENT ON TABLE application_scores IS 'Calculated scores for each application - determines routing';
COMMENT ON COLUMN application_scores.application_id IS 'Reference to the application being scored';
COMMENT ON COLUMN application_scores.stage_score IS 'Score based on current stage';
COMMENT ON COLUMN application_scores.urgency_score IS 'Score based on urgency level';
COMMENT ON COLUMN application_scores.problem_score IS 'Score based on problem description quality';
COMMENT ON COLUMN application_scores.action_score IS 'Score based on solutions attempted';
COMMENT ON COLUMN application_scores.collaboration_score IS 'Score based on willingness to collaborate';
COMMENT ON COLUMN application_scores.access_score IS 'Score based on willingness to provide access';
COMMENT ON COLUMN application_scores.outcome_score IS 'Score based on outcome clarity';
COMMENT ON COLUMN application_scores.payment_score IS 'Score based on payment intent';
COMMENT ON COLUMN application_scores.total_score IS 'Sum of all individual scores';
COMMENT ON COLUMN application_scores.priority_level IS 'Priority level for routing (high/medium/low)';
COMMENT ON COLUMN application_scores.auto_reject IS 'Whether this application should be auto-rejected';


-- ============================================================================
-- TABLE: application_status (LIFECYCLE)
-- ============================================================================
-- This drives your routing + CRM
-- Tracks the status of each application through the pipeline

CREATE TABLE IF NOT EXISTS application_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,

  -- Status
  status TEXT NOT NULL,

  -- Decision reason
  decision_reason TEXT,

  -- Review tracking
  reviewed_by TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT application_status_status_check CHECK (status IN (
    'new',
    'reviewing',
    'shortlisted',
    'call_scheduled',
    'accepted',
    'rejected'
  ))
);

-- Add comments for documentation
COMMENT ON TABLE application_status IS 'Status and lifecycle tracking for applications';
COMMENT ON COLUMN application_status.application_id IS 'Reference to the application';
COMMENT ON COLUMN application_status.status IS 'Current status in the pipeline';
COMMENT ON COLUMN application_status.decision_reason IS 'Reason for status change or rejection';
COMMENT ON COLUMN application_status.reviewed_by IS 'ID of the admin who reviewed (future feature)';
COMMENT ON COLUMN application_status.updated_at IS 'Timestamp of last status update';


-- ============================================================================
-- TABLE: application_events (OPTIONAL BUT POWERFUL)
-- ============================================================================
-- Track actions and events for each application
-- Useful for analytics and audit trail

CREATE TABLE IF NOT EXISTS application_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,

  -- Event details
  event_type TEXT NOT NULL,
  metadata JSONB,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE application_events IS 'Event log for each application - tracks all actions and changes';
COMMENT ON COLUMN application_events.application_id IS 'Reference to the application';
COMMENT ON COLUMN application_events.event_type IS 'Type of event (submitted, scored, shortlisted, etc.)';
COMMENT ON COLUMN application_events.metadata IS 'Additional event data as JSON';
COMMENT ON COLUMN application_events.created_at IS 'Timestamp when the event occurred';
