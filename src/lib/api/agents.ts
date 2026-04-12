/**
 * Agent Management API Client
 *
 * Handles agent instances, health monitoring, and statistics.
 */

import { api } from './index';

// ============================================================================
// Type Definitions
// ============================================================================

export interface AgentInstance {
  id: string;
  name: string;
  agent_type: string;
  status: 'idle' | 'busy' | 'offline' | 'error';
  active_tasks: number;
  max_concurrent_tasks: number;
  capabilities?: string[];
  model_config?: Record<string, any>;
  heartbeat_at?: string;
  created_at?: string;
  updated_at?: string;
  health?: {
    status: 'healthy' | 'unhealthy' | 'unknown';
    last_heartbeat: string | null;
  };
}

export interface AgentStatistics {
  total_agents: number;
  by_status: {
    idle: number;
    busy: number;
    offline: number;
    error: number;
  };
  by_type: Record<string, number>;
  total_active_tasks: number;
}

export interface AgentHealth {
  agent_id: string;
  status: 'healthy' | 'unhealthy';
  last_heartbeat: string | null;
  seconds_since_heartbeat: number | null;
  agent_status: string;
}

export interface AgentTypeStats {
  agent_type: string;
  count: number;
  idle_count: number;
  busy_count: number;
  offline_count: number;
  error_count: number;
}

// ============================================================================
// Agent API Functions
// ============================================================================

/**
 * List agent instances with optional filters.
 */
export async function listAgents(params?: {
  status?: string;
  agent_type?: string;
  limit?: number;
}): Promise<{ count: number; agents: AgentInstance[] }> {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.set('status', params.status);
  if (params?.agent_type) queryParams.set('agent_type', params.agent_type);
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  const endpoint = `/api/v1/agents/instances${queryParams.toString() ? `?${queryParams}` : ''}`;
  return api.get(endpoint);
}

/**
 * Get specific agent instance details.
 */
export async function getAgentInstance(instanceId: string): Promise<AgentInstance> {
  return api.get(`/api/v1/agents/instances/${instanceId}`);
}

/**
 * Check agent instance health.
 */
export async function checkAgentHealth(instanceId: string): Promise<AgentHealth> {
  return api.get(`/api/v1/agents/instances/${instanceId}/health`);
}

/**
 * Get aggregate agent statistics.
 */
export async function getAgentStatistics(params?: {
  agent_type?: string;
}): Promise<AgentStatistics> {
  const queryParams = new URLSearchParams();
  if (params?.agent_type) queryParams.set('agent_type', params.agent_type);

  const endpoint = `/api/v1/agents/statistics${queryParams.toString() ? `?${queryParams}` : ''}`;
  return api.get(endpoint);
}

/**
 * List all agent types with statistics.
 */
export async function listAgentTypes(): Promise<{ agent_types: AgentTypeStats[] }> {
  return api.get('/api/v1/agents/types');
}

/**
 * Cleanup stale agent instances.
 */
export async function cleanupStaleAgents(timeoutSeconds?: number): Promise<{
  message: string;
  cleaned_count: number;
}> {
  const queryParams = new URLSearchParams();
  if (timeoutSeconds) queryParams.set('timeout_seconds', timeoutSeconds.toString());

  const endpoint = `/api/v1/agents/cleanup${queryParams.toString() ? `?${queryParams}` : ''}`;
  return api.post(endpoint);
}

