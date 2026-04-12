import { supabaseAdmin, type Application, type ApplicationScore } from './supabase';

/**
 * Create applicant record
 */
export async function createApplicant(data: {
  full_name: string;
  email: string;
  company_name?: string;
  website?: string;
}) {
  const { data: applicant, error } = await supabaseAdmin
    .from('applicants')
    .insert({
      full_name: data.full_name,
      email: data.email,
      company_name: data.company_name || null,
      website: data.website || null,
    })
    .select('id')
    .single();

  if (error) throw error;
  return applicant;
}

/**
 * Get applicant by email
 */
export async function getApplicantByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('applicants')
    .select('id')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/**
 * Get or create applicant by email
 */
export async function getOrCreateApplicant(data: {
  full_name: string;
  email: string;
  company_name?: string;
  website?: string;
}) {
  const existing = await getApplicantByEmail(data.email);

  if (existing) {
    return existing;
  }

  return await createApplicant(data);
}

/**
 * Create application with scoring
 */
export async function createApplication(
  applicantId: string,
  data: Omit<Application, 'id' | 'applicant_id' | 'created_at'>
) {
  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .insert({
      ...data,
      applicant_id: applicantId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return application;
}

/**
 * Calculate application score
 */
export function calculateScore(data: {
  stage: string | null;
  actively_building: boolean | null;
  urgency: string | null;
  biggest_problem: string | null;
  attempted_solutions: string | null;
  willing_to_collaborate: boolean | null;
  can_provide_access: boolean | null;
  desired_outcome: string | null;
  payment_intent: string | null;
  intent_type: string | null;
}): Omit<ApplicationScore, 'id' | 'application_id' | 'created_at'> {
  let score = 0;

  // Stage scoring
  const stageScores: Record<string, number> = {
    'revenue': 3,
    'early_users': 2,
    'mvp': 1,
    'idea': 0,
  };
  const stageScore = stageScores[data.stage || ''] || 0;
  score += stageScore;

  // Actively building
  const buildingScore = data.actively_building ? 2 : 0;
  score += buildingScore;

  // Urgency scoring
  const urgencyScores: Record<string, number> = {
    'urgent': 3,
    'important': 2,
    'not_urgent': 0,
  };
  const urgencyScore = urgencyScores[data.urgency || ''] || 0;
  score += urgencyScore;

  // Problem quality (based on length)
  let problemScore = 0;
  if (data.biggest_problem && data.biggest_problem.length > 50) {
    problemScore = 3;
  } else if (data.biggest_problem && data.biggest_problem.length > 20) {
    problemScore = 1;
  }
  score += problemScore;

  // Action taken
  let actionScore = 0;
  if (data.attempted_solutions && data.attempted_solutions.length > 50) {
    actionScore = 2;
  } else if (data.attempted_solutions && data.attempted_solutions.length > 20) {
    actionScore = 1;
  }
  score += actionScore;

  // Collaboration scoring
  let collaborationScore = 0;
  if (data.willing_to_collaborate) {
    collaborationScore = 3;
  }

  // Access scoring
  const accessScore = data.can_provide_access ? 2 : 0;
  score += accessScore;

  // Outcome clarity
  let outcomeScore = 0;
  if (data.desired_outcome && data.desired_outcome.length > 80) {
    outcomeScore = 3;
  } else if (data.desired_outcome && data.desired_outcome.length > 30) {
    outcomeScore = 1;
  }
  score += outcomeScore;

  // Payment intent
  const paymentScores: Record<string, number> = {
    'yes': 2,
    'maybe': 1,
    'no': 0,
  };
  const paymentScore = paymentScores[data.payment_intent || ''] || 0;
  score += paymentScore;

  // Intent type filter
  if (data.intent_type === 'design_partner') {
    score += 2;
  } else if (data.intent_type === 'explore') {
    score -= 1;
  } else if (data.intent_type === 'unsure') {
    score -= 2;
  }

  // Determine priority level
  let priorityLevel: 'high' | 'medium' | 'low' = 'low';
  if (score >= 10) {
    priorityLevel = 'high';
  } else if (score >= 6) {
    priorityLevel = 'medium';
  }

  // Auto-reject conditions
  const autoReject =
    !data.actively_building ||
    data.urgency === 'not_urgent' ||
    !data.willing_to_collaborate ||
    !data.can_provide_access;

  return {
    stage_score: stageScore,
    urgency_score: urgencyScore,
    problem_score: problemScore,
    action_score: actionScore,
    collaboration_score: collaborationScore,
    access_score: accessScore,
    outcome_score: outcomeScore,
    payment_score: paymentScore,
    total_score: score,
    priority_level: priorityLevel,
    auto_reject: autoReject,
  };
}

/**
 * Create application score record
 */
export async function createApplicationScore(
  applicationId: string,
  scoreData: Omit<ApplicationScore, 'id' | 'application_id' | 'created_at'>
) {
  const { data: score, error } = await supabaseAdmin
    .from('application_scores')
    .insert({
      application_id: applicationId,
      ...scoreData,
    })
    .select('id, total_score, priority_level, auto_reject')
    .single();

  if (error) throw error;
  return score;
}

/**
 * Create application status record
 */
export async function createApplicationStatus(
  applicationId: string,
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected',
  decisionReason?: string
) {
  const { data, error } = await supabaseAdmin
    .from('application_status')
    .insert({
      application_id: applicationId,
      status,
      decision_reason: decisionReason || null,
    })
    .select('id, status')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create application event
 */
export async function createApplicationEvent(
  applicationId: string,
  eventType: string,
  metadata?: Record<string, unknown>
) {
  const { data, error } = await supabaseAdmin
    .from('application_events')
    .insert({
      application_id: applicationId,
      event_type: eventType,
      metadata: metadata || null,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Complete application submission flow
 */
export async function submitApplication(data: {
  applicant: {
    full_name: string;
    email: string;
    company_name?: string;
    website?: string;
  };
  application: Omit<Application, 'id' | 'applicant_id' | 'created_at'>;
}) {
  try {
    // Step 1: Get or create applicant
    const applicant = await getOrCreateApplicant(data.applicant);

    // Step 2: Create application
    const application = await createApplication(applicant.id, data.application);

    // Step 3: Calculate and save score
    const scoreData = calculateScore(data.application);
    const score = await createApplicationScore(application.id, scoreData);

    // Step 4: Determine initial status based on score
    let initialStatus: 'new' | 'reviewing' | 'shortlisted' | 'rejected';

    if (score.auto_reject) {
      initialStatus = 'rejected';
    } else if (score.priority_level === 'high') {
      initialStatus = 'shortlisted';
    } else if (score.priority_level === 'medium') {
      initialStatus = 'reviewing';
    } else {
      initialStatus = 'rejected';
    }

    const status = await createApplicationStatus(
      application.id,
      initialStatus,
      score.auto_reject ? 'Does not meet criteria' : undefined
    );

    // Step 5: Log submission event
    await createApplicationEvent(application.id, 'submitted', {
      score: score.total_score,
      priority: score.priority_level,
    });

    return {
      applicationId: application.id,
      score: score.total_score,
      priority: score.priority_level,
      status: initialStatus,
      autoReject: score.auto_reject,
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}
