# Database Migrations

This folder contains SQL migrations for the Rivtor design partner application system.

## Migration Files

### 001_create_tables.sql
Creates all core tables:
- `applicants` - Applicant information
- `applications` - Application submissions
- `application_scores` - Calculated scores
- `application_status` - Status tracking
- `application_events` - Event logging

### 002_rls_policies.sql
Enables Row Level Security (RLS) and creates security policies:
- Service role (admin) has full access
- Anon users can insert data (for form submissions)
- Authenticated users can read their own data
- Includes helpful views for common queries

### 003_create_indexes.sql
Creates indexes for optimal query performance:
- Email lookups
- Status filtering
- Score-based sorting
- Composite indexes for common query patterns

### 004_functions_and_triggers.sql
Creates helper functions and triggers:
- `calculate_application_score()` - Score calculation logic
- `get_or_create_applicant()` - Get or create applicant by email
- `submit_application()` - Complete submission flow
- `get_application_summary()` - Get application details
- `get_dashboard_stats()` - Dashboard statistics

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended for initial setup)

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Run each migration file in order (001 → 002 → 003 → 004)

### Option 2: Using psql (Command line)

```bash
# Set your Supabase connection details
export DB_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Run migrations in order
psql $DB_URL -f migrations/001_create_tables.sql
psql $DB_URL -f migrations/002_rls_policies.sql
psql $DB_URL -f migrations/003_create_indexes.sql
psql $DB_URL -f migrations/004_functions_and_triggers.sql
```

### Option 3: Using migration tools (recommended for production)

```bash
# Using sqitch
sqitch deploy db:pg:postgres://postgres:[PASSWORD]@db...

# Using flyway
flyway migrate -url=jdbc:postgresql://db... -user=postgres -password=...
```

## Post-Setup Checklist

After running migrations:

1. **Verify tables were created:**
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```

2. **Verify RLS is enabled:**
   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public'
   ORDER BY tablename;
   ```

3. **Verify indexes were created:**
   ```sql
   SELECT indexname, tablename
   FROM pg_indexes
   WHERE schemaname = 'public'
   ORDER BY tablename, indexname;
   ```

4. **Verify functions were created:**
   ```sql
   SELECT routine_name, routine_type
   FROM information_schema.routines
   WHERE routine_schema = 'public'
   ORDER BY routine_name;
   ```

5. **Test the application flow:**
   - Submit a test application through the form
   - Check that data appears in all tables
   - Verify scoring is calculated correctly

## Database Schema Overview

```
applicants (who)
  ↓ 1:N
applications (submissions)
  ↓ 1:1       1:1       1:N
application_scores  application_status  application_events
```

## Common Queries

### Get all high-priority applications:
```sql
SELECT * FROM high_priority_applications;
```

### Get application with all details:
```sql
SELECT * FROM applications_with_scores
WHERE application_id = '[UUID]';
```

### Get dashboard stats:
```sql
SELECT * FROM get_dashboard_stats();
```

### Get applicant's application history:
```sql
SELECT * FROM applications_with_scores
WHERE email = 'user@example.com'
ORDER BY application_created_at DESC;
```

## Security Notes

- **Never** commit service role keys to version control
- **Always** use RLS policies to restrict data access
- **Monitor** index usage and remove unused indexes
- **Analyze** query performance regularly

## Troubleshooting

### Tables not found?
Make sure you ran migrations in order (001 → 002 → 003 → 004)

### Permission denied?
Check that RLS policies are correctly configured:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### Slow queries?
Check index usage:
```sql
SELECT * FROM pg_stat_user_indexes;
```

### Need to reset?
Drop all tables and re-run migrations:
```sql
DROP TABLE IF EXISTS application_events CASCADE;
DROP TABLE IF EXISTS application_status CASCADE;
DROP TABLE IF EXISTS application_scores CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;
DROP VIEW IF EXISTS applications_with_scores CASCADE;
DROP VIEW IF EXISTS high_priority_applications CASCADE;
DROP VIEW IF EXISTS rejected_applications CASCADE;
```

## Support

For issues or questions:
1. Check Supabase logs: https://app.supabase.com/project/[PROJECT-ID]/logs
2. Review SQL execution in SQL Editor
3. Check API logs in your Next.js application
