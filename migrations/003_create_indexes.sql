-- Migration: Create indexes for performance
-- This migration creates indexes to optimize query performance

-- ============================================================================
-- APPLICANTS INDEXES
-- ============================================================================

-- Index on email for lookups (frequently used to check existing applicants)
CREATE INDEX IF NOT EXISTS idx_applicants_email ON applicants(email);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON applicants(created_at DESC);


-- ============================================================================
-- APPLICATIONS INDEXES
-- ============================================================================

-- Index on applicant_id for joining with applicants table
CREATE INDEX IF NOT EXISTS idx_applications_applicant_id ON applications(applicant_id);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Index on stage for filtering
CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications(stage);

-- Index on urgency for filtering
CREATE INDEX IF NOT EXISTS idx_applications_urgency ON applications(urgency);

-- Index on intent_type for filtering
CREATE INDEX IF NOT EXISTS idx_applications_intent_type ON applications(intent_type);

-- Index on actively_building for filtering
CREATE INDEX IF NOT EXISTS idx_applications_actively_building ON applications(actively_building);

-- Composite index for common queries (stage + urgency)
CREATE INDEX IF NOT EXISTS idx_applications_stage_urgency ON applications(stage, urgency);


-- ============================================================================
-- APPLICATION_SCORES INDEXES
-- ============================================================================

-- Index on application_id (unique constraint already creates index, but explicit for clarity)
CREATE INDEX IF NOT EXISTS idx_scores_application_id ON application_scores(application_id);

-- Index on total_score for sorting/ranking
CREATE INDEX IF NOT EXISTS idx_scores_total_score ON application_scores(total_score DESC);

-- Index on priority_level for filtering
CREATE INDEX IF NOT EXISTS idx_scores_priority_level ON application_scores(priority_level);

-- Index on auto_reject for filtering
CREATE INDEX IF NOT EXISTS idx_scores_auto_reject ON application_scores(auto_reject);

-- Composite index for priority queries (priority_level + auto_reject + total_score)
CREATE INDEX IF NOT EXISTS idx_scores_priority_reject_score ON application_scores(priority_level, auto_reject, total_score DESC);


-- ============================================================================
-- APPLICATION_STATUS INDEXES
-- ============================================================================

-- Index on application_id (unique constraint already creates index)
CREATE INDEX IF NOT EXISTS idx_status_application_id ON application_status(application_id);

-- Index on status for filtering (CRITICAL for routing)
CREATE INDEX IF NOT EXISTS idx_status_status ON application_status(status);

-- Index on updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_status_updated_at ON application_status(updated_at DESC);

-- Composite index for status filtering (status + updated_at)
CREATE INDEX IF NOT EXISTS idx_status_status_updated ON application_status(status, updated_at DESC);


-- ============================================================================
-- APPLICATION_EVENTS INDEXES
-- ============================================================================

-- Index on application_id for joining
CREATE INDEX IF NOT EXISTS idx_events_application_id ON application_events(application_id);

-- Index on event_type for filtering
CREATE INDEX IF NOT EXISTS idx_events_event_type ON application_events(event_type);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_events_created_at ON application_events(created_at DESC);

-- Composite index for event queries (application_id + created_at)
CREATE INDEX IF NOT EXISTS idx_events_app_created ON application_events(application_id, created_at DESC);


-- ============================================================================
-- PARTIAL INDEXES (for specific query patterns)
-- ============================================================================

-- Index only on new/reviewing applications (frequently queried)
CREATE INDEX IF NOT EXISTS idx_applications_new_reviewing
ON application_status(status, updated_at DESC)
WHERE status IN ('new', 'reviewing');

-- Index only on high priority scores
CREATE INDEX IF NOT EXISTS idx_scores_high_priority
ON application_scores(total_score DESC)
WHERE priority_level = 'high' AND auto_reject = false;

-- Index only on rejected applications (for analysis)
CREATE INDEX IF NOT EXISTS idx_status_rejected
ON application_status(updated_at DESC)
WHERE status = 'rejected';


-- ============================================================================
-- GIN INDEXES (for JSONB metadata)
-- ============================================================================

-- GIN index on application_events metadata for JSON queries
CREATE INDEX IF NOT EXISTS idx_events_metadata_gin
ON application_events
USING GIN (metadata);

-- GIN index on applications (if we add JSONB columns later)
-- CREATE INDEX IF NOT EXISTS idx_applications_metadata_gin
-- ON applications
-- USING GIN (metadata);


-- ============================================================================
-- FUNCTION: Update application_status updated_at automatically
-- ============================================================================

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_application_status_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS trigger_update_application_status_updated_at ON application_status;
CREATE TRIGGER trigger_update_application_status_updated_at
  BEFORE UPDATE ON application_status
  FOR EACH ROW
  EXECUTE FUNCTION update_application_status_updated_at();

COMMENT ON FUNCTION update_application_status_updated_at() IS 'Automatically update updated_at column on row update';


-- ============================================================================
-- STATISTICS UPDATE (for query planner)
-- ============================================================================

-- Update statistics for better query planning
ANALYZE applicants;
ANALYZE applications;
ANALYZE application_scores;
ANALYZE application_status;
ANALYZE application_events;


-- ============================================================================
-- INDEX USAGE NOTES
-- ============================================================================

/*
IMPORTANT: Monitor index usage and adjust as needed

To check index usage:
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

Unused indexes (low scans) can be dropped to improve write performance.

To see index sizes:
SELECT
  indexname,
  pg_size_pretty(pg_relation_size(indexrelid::regclass)) as size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexrelid::regclass) DESC;
*/
