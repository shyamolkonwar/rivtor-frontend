/**
 * Application Flow Utilities
 *
 * Shared types and utilities for the application flow across qualification, application, and review pages.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface QualificationData {
  stage: string;
  activelyBuilding: string;
  urgency: string;
  problem: string;
}

export interface StoredApplicationData {
  applicationId?: string;
  totalScore?: string;
  priority?: string;
  status?: string;
  // Add other fields as needed
}

// ============================================================================
// SESSION STORAGE KEYS (Centralized for consistency)
// ============================================================================

export const SESSION_KEYS = {
  // Complete data objects
  QUALIFICATION_DATA: 'qualificationData',
  APPLICATION_DATA: 'applicationData',

  // Individual qualification fields
  QUALIFICATION_STAGE: 'qualificationStage',
  QUALIFICATION_ACTIVELY_BUILDING: 'qualificationActivelyBuilding',
  QUALIFICATION_URGENCY: 'qualificationUrgency',
  QUALIFICATION_PROBLEM: 'qualificationProblem',

  // Scores
  QUALIFICATION_SCORE: 'qualificationScore',
  TOTAL_SCORE: 'totalScore',

  // Results
  APPLICATION_ID: 'applicationId',
  PRIORITY: 'priority',
  STATUS: 'status',
} as const;

// ============================================================================
// MAPPING FUNCTIONS
// ============================================================================

/**
 * Map qualification stage to application stage
 */
export function mapStageFromQualification(qualStage: string): string {
  const stageMap: Record<string, string> = {
    'Idea': 'Idea stage',
    'MVP': 'Building MVP',
    'Early users': 'Have users',
    'Revenue': 'Revenue',
  };
  return stageMap[qualStage] || '';
}

/**
 * Map application stage to database stage value
 */
export function mapStageToDatabase(stage: string): string | null {
  const stageMap: Record<string, string> = {
    'Idea stage': 'idea',
    'Building MVP': 'mvp',
    'Launched': 'mvp',
    'Have users': 'early_users',
    'Early users / Growing': 'early_users',
    'Revenue': 'revenue',
    'Funded': 'revenue',
  };
  return stageMap[stage] || null;
}

/**
 * Map qualification urgency to application urgency
 */
export function mapUrgencyFromQualification(qualUrgency: string): string {
  const urgencyMap: Record<string, string> = {
    'Not urgent': 'Not urgent',
    'Important': 'Important',
    'Urgent': 'Urgent',
  };
  return urgencyMap[qualUrgency] || '';
}

/**
 * Map application urgency to database urgency value
 */
export function mapUrgencyToDatabase(urgency: string): string | null {
  const urgencyMap: Record<string, string> = {
    'Not urgent': 'not_urgent',
    'Important': 'important',
    'Urgent': 'urgent',
  };
  return urgencyMap[urgency] || null;
}

/**
 * Map problem area to database value
 */
export function mapProblemAreaToDatabase(area: string): string | null {
  const areaMap: Record<string, string> = {
    'Execution - can\'t get things done': 'ops',
    'Hiring - can\'t find the right people': 'ops',
    'Product - don\'t know what to build': 'acquisition',
    'Growth - can\'t acquire users': 'acquisition',
    'Capital - need funding': 'capital',
    'Strategy - don\'t know next steps': 'ops',
    'Other': 'unknown',
  };
  return areaMap[area] || null;
}

/**
 * Map payment intent to database value
 */
export function mapPaymentIntentToDatabase(intent: string): string | null {
  const intentMap: Record<string, string> = {
    'Yes': 'yes',
    'Maybe': 'maybe',
    'No': 'no',
  };
  return intentMap[intent] || null;
}

/**
 * Map intent type to database value
 */
export function mapIntentTypeToDatabase(intent: string): string | null {
  const intentMap: Record<string, string> = {
    'Work closely as a design partner': 'design_partner',
    'Explore usage': 'explore',
    'Not sure': 'unsure',
  };
  return intentMap[intent] || null;
}

// ============================================================================
// SESSION STORAGE HELPERS
// ============================================================================

/**
 * Store qualification data
 */
export function storeQualificationData(data: QualificationData, score: number): void {
  // Store complete object
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_DATA, JSON.stringify(data));
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_SCORE, score.toString());

  // Store individual fields for easy access
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_STAGE, data.stage);
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_ACTIVELY_BUILDING, data.activelyBuilding);
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_URGENCY, data.urgency);
  sessionStorage.setItem(SESSION_KEYS.QUALIFICATION_PROBLEM, data.problem);
}

/**
 * Get qualification data
 */
export function getQualificationData(): QualificationData | null {
  const data = sessionStorage.getItem(SESSION_KEYS.QUALIFICATION_DATA);
  return data ? JSON.parse(data) : null;
}

/**
 * Get individual qualification field
 */
export function getQualificationField(key: keyof typeof SESSION_KEYS): string | null {
  const fieldKey = SESSION_KEYS[key];
  if (key === 'QUALIFICATION_ACTIVELY_BUILDING') {
    return sessionStorage.getItem(fieldKey);
  }
  return sessionStorage.getItem(fieldKey);
}

/**
 * Clear all application flow data from session storage
 */
export function clearApplicationFlowData(): void {
  Object.values(SESSION_KEYS).forEach(key => {
    sessionStorage.removeItem(key);
  });
}

/**
 * Store application result data
 */
export function storeApplicationResult(data: StoredApplicationData): void {
  if (data.applicationId) sessionStorage.setItem(SESSION_KEYS.APPLICATION_ID, data.applicationId);
  if (data.totalScore) sessionStorage.setItem(SESSION_KEYS.TOTAL_SCORE, data.totalScore);
  if (data.priority) sessionStorage.setItem(SESSION_KEYS.PRIORITY, data.priority);
  if (data.status) sessionStorage.setItem(SESSION_KEYS.STATUS, data.status);
}

/**
 * Get application result data
 */
export function getApplicationResult(): StoredApplicationData {
  return {
    applicationId: sessionStorage.getItem(SESSION_KEYS.APPLICATION_ID) || undefined,
    totalScore: sessionStorage.getItem(SESSION_KEYS.TOTAL_SCORE) || undefined,
    priority: sessionStorage.getItem(SESSION_KEYS.PRIORITY) || undefined,
    status: sessionStorage.getItem(SESSION_KEYS.STATUS) || undefined,
  };
}
