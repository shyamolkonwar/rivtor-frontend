/**
 * Timeline / Event System API Client
 *
 * Handles canonical event log and execution timeline queries.
 */

import { api } from './index';

// ============================================================================
// Type Definitions
// ============================================================================

export interface TimelineEvent {
  event_id: string;
  event_type: string;
  trace_id: string;
  span_id: string;
  parent_span_id?: string;
  graph_id: string;
  task_id?: string;
  agent_id?: string;
  sandbox_id?: string;
  timestamp?: string;
  duration_ms?: number;
  metadata: Record<string, any>;
}

export interface TimelineSpan {
  span_id: string;
  parent_span_id?: string;
  trace_id: string;
  name: string;
  start_time?: string;
  end_time?: string;
  duration_ms?: number;
  events: TimelineEvent[];
  status: string;
  metadata: Record<string, any>;
}

export interface Timeline {
  graph_id: string;
  total_events: number;
  total_duration_ms?: number;
  spans: TimelineSpan[];
  events: TimelineEvent[];
}

export interface TimelineSummary {
  total_events: number;
  total_executions: number;
  success_rate: number;
  avg_execution_time: number;
  recent_events: TimelineEvent[];
}

// ============================================================================
// Timeline API Functions
// ============================================================================

/**
 * Get full timeline for a task graph.
 */
export async function getGraphTimeline(graphId: string): Promise<Timeline> {
  return api.get(`/api/v1/timeline/graph/${graphId}`);
}

/**
 * Get timeline for a specific task.
 */
export async function getTaskTimeline(taskId: string): Promise<Timeline> {
  return api.get(`/api/v1/timeline/task/${taskId}`);
}

/**
 * Get timeline for a specific agent.
 */
export async function getAgentTimeline(agentId: string): Promise<Timeline> {
  return api.get(`/api/v1/timeline/agent/${agentId}`);
}

/**
 * Get timeline for a sandbox session.
 */
export async function getSandboxTimeline(sandboxId: string): Promise<Timeline> {
  return api.get(`/api/v1/timeline/sandbox/${sandboxId}`);
}

/**
 * Get timeline summary with recent events.
 */
export async function getTimelineSummary(params?: {
  limit?: number;
  hours?: number;
}): Promise<TimelineSummary> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.hours) queryParams.set('hours', params.hours.toString());

  // This endpoint may need to be added to backend if not present
  // For now, returning mock data structure
  const endpoint = `/api/v1/timeline/summary${queryParams.toString() ? `?${queryParams}` : ''}`;

  try {
    return await api.get<TimelineSummary>(endpoint);
  } catch (error) {
    // Return default summary if endpoint doesn't exist
    return {
      total_events: 0,
      total_executions: 0,
      success_rate: 1,
      avg_execution_time: 0,
      recent_events: [],
    };
  }
}

/**
 * Get all timeline events with filters.
 */
export async function getTimelineEvents(params?: {
  event_type?: string;
  graph_id?: string;
  agent_id?: string;
  limit?: number;
}): Promise<{ events: TimelineEvent[]; total: number }> {
  const queryParams = new URLSearchParams();
  if (params?.event_type) queryParams.set('event_type', params.event_type);
  if (params?.graph_id) queryParams.set('graph_id', params.graph_id);
  if (params?.agent_id) queryParams.set('agent_id', params.agent_id);
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  // This endpoint may need to be added to backend
  const endpoint = `/api/v1/timeline/events${queryParams.toString() ? `?${queryParams}` : ''}`;

  try {
    return await api.get(endpoint);
  } catch (error) {
    return { events: [], total: 0 };
  }
}
