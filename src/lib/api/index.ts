/**
 * Rivtor API Client
 *
 * Central API client for all backend services.
 * Handles authentication, error handling, and request/response transformation.
 */

// ============================================================================
// Configuration
// ============================================================================

const getApiBaseUrl = (): string => {
  // Browser (client-side) needs access from host machine
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  // Server-side (Node.js Runtime in Docker) can use internal hostname
  return process.env.BACKEND_URL || 'http://backend:8000';
};

// ============================================================================
// Type Definitions
// ============================================================================

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page?: number;
  pageSize?: number;
}

// ============================================================================
// Error Handling
// ============================================================================

class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      // Use default error message
    }

    throw new ApiError(errorMessage, response.status);
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text() as any;
}

// ============================================================================
// Request Helper
// ============================================================================

async function getAuthToken(): Promise<string | null> {
  try {
    // Import the in-memory token store
    const { getAccessToken } = await import('@/lib/auth/token-store');
    return getAccessToken();
  } catch {
    return null;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = await getAuthToken();
  if (token) {
    (defaultHeaders as any)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Ensure cookies are sent and received
  });

  return handleResponse<T>(response);
}

const api = {
  get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
  patch: <T>(endpoint: string, data?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// ============================================================================
// Health Check
// ============================================================================

export async function checkHealth() {
  return api.get<{ status: string; timestamp: string }>('/health');
}

// ============================================================================
// Auth-specific API calls
// ============================================================================

export const authApi = {
  /**
   * Sync user with backend after Supabase auth
   * Returns a unified user object with all necessary fields
   */
  sync: async (accessToken: string) => {
    const baseUrl = typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
      : (process.env.BACKEND_URL || 'http://backend:8000');

    const syncUrl = `${baseUrl}/api/v1/auth/supabase/sync`;

    try {
      const response = await fetch(syncUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.detail || `Failed to sync user: ${response.status}`,
          response.status
        );
      }

      const data = await response.json();

      // Map backend response to AuthUser interface
      const mappedUser = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        role: data.user.role,
        subscription_status: data.subscription?.status,
        onboarding_completed: data.user.onboarding_completed || false,
        neu_balance: data.subscription?.neu_balance || 0,
        permissions: data.permissions || [],
      };
      return mappedUser;

    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh user data from backend
   */
  refresh: (accessToken: string) =>
    request<any>('/api/v1/auth/supabase/refresh', {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken }),
    }),

  /**
   * Get comprehensive user status
   */
  getStatus: (accessToken: string) =>
    request<any>(`/api/v1/auth/status?access_token=${encodeURIComponent(accessToken)}`),

  /**
   * Log failed login attempt
   */
  logFailedAttempt: (email: string, type: string = 'password') =>
    request('/api/v1/auth/failed-attempt', {
      method: 'POST',
      body: JSON.stringify({ email, type }),
    }),

  /**
   * Complete onboarding
   */
  completeOnboarding: (data?: any) =>
    request('/api/v1/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),
}

/**
 * Billing API calls
 */
export const billingApi = {
  /**
   * Get current NEU balance
   */
  getBalance: () => request<any>('/api/v1/billing/balance'),

  /**
   * Get transaction history
   */
  getTransactions: (limit = 50, offset = 0, type?: string) =>
    request<any>(`/api/v1/billing/transactions?limit=${limit}&offset=${offset}${type ? `&transaction_type=${type}` : ''}`),

  /**
   * Estimate NEU cost
   */
  estimateCost: (baseUnits: number, modelId: string) =>
    request<any>('/api/v1/billing/estimate', {
      method: 'POST',
      body: JSON.stringify({
        base_units: baseUnits,
        model_id: modelId,
      }),
    }),

  /**
   * Purchase additional NEU credits
   */
  purchaseNeu: (amount: number, paymentMethodId: string) =>
    request<any>('/api/v1/billing/purchase', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        stripe_payment_method_id: paymentMethodId,
      }),
    }),

  /**
   * List available plans
   */
  getPlans: () => request<any>('/api/v1/billing/plans'),

  /**
   * List available models
   */
  getModels: () => request<any>('/api/v1/billing/models'),
}

// ============================================================================
// Export
// ============================================================================

export { api, ApiError }
