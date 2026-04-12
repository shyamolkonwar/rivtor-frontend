import { api } from "./index";

// ============================================================================
// Decision Execution API - READ ONLY for Analytics Dashboard
// ============================================================================

/**
 * Decision Execution Status - represents the execution of a strategic decision
 *
 * NOTE: Per Slack-native architecture, all execution commands must go through Slack.
 * This API is READ-ONLY for displaying analytics in the Control Panel.
 */
export interface DecisionExecution {
  id: string;
  decisionId: string;
  workspaceId: string;
  status: "pending" | "running" | "paused" | "completed" | "failed";
  totalSteps: number;
  completedSteps: number;
  failedSteps: number;
  currentStep: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @deprecated All execution commands now go through Slack. Use listExecutions for analytics only.
 */
export const ctoApi = {
  /**
   * List decision executions for analytics dashboard (READ-ONLY)
   */
  listExecutions: async (): Promise<{ executions: DecisionExecution[]; total: number }> => {
    const response = await api.get<{ executions: DecisionExecution[]; total: number }>("/api/cto/executions");
    return response;
  },
};

// ============================================================================
// Workspaces API (replaces Projects API)
// ============================================================================

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
  updated_at?: string;
}

export const workspacesApi = {
  list: async (): Promise<{ workspaces: Workspace[]; total: number }> => {
    const response = await api.get<{ workspaces: Workspace[]; total: number }>("/api/v1/workspaces");
    return response;
  },

  get: async (workspaceId: string): Promise<Workspace> => {
    const response = await api.get<Workspace>(`/api/v1/workspaces/${workspaceId}`);
    return response;
  },

  create: async (data: { name: string; slug?: string }): Promise<Workspace> => {
    const response = await api.post<Workspace>("/api/v1/workspaces", data);
    return response;
  },
};

// ============================================================================
// Usage API
// ============================================================================

export interface UsageData {
  daily_generates: number;
  daily_generates_limit: number;
  daily_edits: number;
  daily_edits_limit: number;
  llm_tokens?: number;
  runtime_minutes?: number;
  remaining: {
    generates: number;
    edits: number;
  };
}

export interface UsageLimits {
  free_tier: {
    daily_generates: number;
    daily_edits: number;
  };
  description: string;
}

export const usageApi = {
  getUsage: async (): Promise<UsageData> => {
    const response = await api.get<UsageData>("/api/v1/usage");
    return response;
  },

  getLimits: async (): Promise<UsageLimits> => {
    const response = await api.get<UsageLimits>("/api/v1/usage/limits");
    return response;
  },
};

// ============================================================================
// Agents API
// ============================================================================

export interface AgentInstance {
  id: string;
  name: string;
  agent_type: string;
  status: "idle" | "busy" | "offline" | "error";
  active_tasks: number;
  max_concurrent_tasks: number;
  heartbeat_at?: string;
  created_at: string;
}

export interface AgentStats {
  count: number;
  agents: AgentInstance[];
}

export const agentsApi = {
  list: async (params?: { status?: string; agent_type?: string; limit?: number }): Promise<AgentStats> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.agent_type) queryParams.append("agent_type", params.agent_type);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    
    const query = queryParams.toString();
    const response = await api.get<AgentStats>(`/api/v1/agents/instances${query ? `?${query}` : ""}`);
    return response;
  },

  get: async (instanceId: string): Promise<AgentInstance> => {
    const response = await api.get<AgentInstance>(`/api/v1/agents/instances/${instanceId}`);
    return response;
  },
};

// ============================================================================
// Integrations API
// ============================================================================

export interface IntegrationStatus {
  connected: boolean;
  provider: string;
  connected_email?: string;
  connected_at?: string;
}

export interface SlackStatus {
  is_connected: boolean;
  workspace_name?: string;
  channel_id?: string;
  channel_name?: string;
  bot_user_id?: string;
}

export const integrationsApi = {
  getSupabaseStatus: async (): Promise<IntegrationStatus> => {
    const response = await api.get<IntegrationStatus>("/api/v1/integrations/status");
    return response;
  },

  getSlackStatus: async (workspaceId: string): Promise<SlackStatus> => {
    const response = await api.get<SlackStatus>(`/api/v1/integrations/slack/status?workspace_id=${workspaceId}`);
    return response;
  },

  disconnectSlack: async (workspaceId: string): Promise<void> => {
    await api.post(`/api/v1/integrations/slack/disconnect?workspace_id=${workspaceId}`);
  },

  getGithubAuthUrl: async (): Promise<{ authorization_url: string }> => {
    const response = await api.get<{ authorization_url: string }>("/api/v1/auth/github/authorize");
    return response;
  },
};

// ============================================================================
// Onboarding & Ontology API
// ============================================================================

export interface CompanyInfo {
  company_name: string;
  industry: string;
  company_size: string;
  founded_year?: number;
  location?: string;
  website?: string;
  products_services: string[];
  target_customers?: string;
  departments: string[];
  key_roles: { title: string; name: string }[];
  goals_short_term: string[];
  goals_long_term: string[];
  tools_used: string[];
  integrations_needed: string[];
  partners_vendors: string[];
}

export interface OnboardingStatus {
  is_onboarded: boolean;
  company_name?: string;
  onboarding_step: string;
  ontology_status: string;
  completed_at?: string;
}

export interface OntologyNode {
  id: string;
  node_type: string;
  name: string;
  properties: Record<string, unknown>;
}

export const onboardingApi = {
  getStatus: async (): Promise<OnboardingStatus> => {
    const response = await api.get<OnboardingStatus>("/api/v1/onboarding/status");
    return response;
  },

  submitCompanyInfo: async (data: CompanyInfo): Promise<void> => {
    await api.post("/api/v1/onboarding/company", data);
  },

  getCompanyInfo: async (): Promise<CompanyInfo> => {
    const response = await api.get<CompanyInfo>("/api/v1/onboarding/company");
    return response;
  },

  completeOnboarding: async (): Promise<void> => {
    await api.post("/api/v1/onboarding/complete");
  },

  getOntology: async (): Promise<{ status: string; data?: OntologyNode[] }> => {
    const response = await api.get<{ status: string; data?: OntologyNode[] }>("/api/v1/onboarding/ontology");
    return response;
  },
};

// ============================================================================
// Stripe API
// ============================================================================

export interface SubscriptionStatus {
  subscription_id?: string;
  status?: string;
  plan?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
}

export interface StripePrices {
  standard: { id: string; price: string; interval: string };
  growth: { id: string; price: string; interval: string };
  enterprise: { id: string; price: string; interval: string };
}

// ============================================================================
// Auth API
// ============================================================================

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
}

export const authApi = {
  logout: async (): Promise<void> => {
    // Supabase handles logout via auth context
    // This is kept for compatibility but not used
  },

  getProfile: async (): Promise<UserProfile> => {
    // Use Supabase user data from auth context instead
    throw new Error("Use useAuth() hook instead of authApi.getProfile()");
  },

  updateProfile: async (data: { full_name?: string }): Promise<UserProfile> => {
    // Use Supabase user update via auth context instead
    throw new Error("Use supabase.auth.updateUser() instead");
  },
};

// ============================================================================
// Stripe API
// ============================================================================

export const stripeApi = {
  createCheckout: async (priceId: string): Promise<{ session_id: string; url: string }> => {
    const response = await api.post<{ session_id: string; url: string }>("/api/v1/stripe/checkout", { price_id: priceId });
    return response;
  },

  getSubscription: async (): Promise<SubscriptionStatus> => {
    const response = await api.get<SubscriptionStatus>("/api/v1/stripe/subscription");
    return response;
  },

  createPortalSession: async (): Promise<{ url: string }> => {
    const response = await api.post<{ url: string }>("/api/v1/stripe/portal");
    return response;
  },

  getPrices: async (): Promise<StripePrices> => {
    const response = await api.get<StripePrices>("/api/v1/stripe/prices");
    return response;
  },
};
