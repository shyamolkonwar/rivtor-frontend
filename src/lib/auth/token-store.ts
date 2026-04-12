/**
 * In-memory access token store for API authentication.
 *
 * The access token is stored in JavaScript memory only (never in localStorage
 * or document.cookie), making it secure against XSS attacks.
 *
 * Token lifecycle:
 * - Set by AuthProvider when serverSession is available
 * - Updated when Supabase refreshes the token
 * - Cleared on logout
 * - Automatically wiped on page refresh (requires server re-validation)
 */

let inMemoryAccessToken: string | null = null;

/**
 * Set the access token in memory.
 * Called by AuthProvider when session is established or refreshed.
 */
export const setAccessToken = (token: string | null): void => {
  inMemoryAccessToken = token;
};

/**
 * Get the access token from memory.
 * Used by API client to attach Authorization header.
 */
export const getAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

/**
 * Clear the access token from memory.
 * Called on logout.
 */
export const clearAccessToken = (): void => {
  inMemoryAccessToken = null;
};
