/**
 * Timeline Types - TypeScript types for execution timeline visualization
 *
 * These types correspond to the Python TimelineService models in:
 * backend/app/agent_os/timeline_service.py
 */

export type TimelineEventType =
  // Agent lifecycle
  | "agent_started"
  | "agent_completed"
  | "agent_failed"
  | "agent_heartbeat"
  | "agent_registered"
  // Task lifecycle
  | "task_queued"
  | "task_started"
  | "task_completed"
  | "task_failed"
  | "task_retry"
  | "task_assigned"
  // Sandbox lifecycle
  | "sandbox_created"
  | "sandbox_destroyed"
  | "command_started"
  | "command_completed"
  // Build events
  | "build_started"
  | "build_completed"
  | "build_failed"
  | "dependency_installed"
  // Lock events
  | "lock_acquired"
  | "lock_released";

export interface TimelineEvent {
  event_id: string;
  event_type: TimelineEventType;
  trace_id: string;
  span_id: string;
  parent_span_id: string | null;
  graph_id: string;
  task_id: string | null;
  agent_id: string | null;
  sandbox_id: string | null;
  timestamp: string | null;
  duration_ms: number | null;
  metadata: Record<string, unknown>;
}

export interface TimelineSpan {
  span_id: string;
  parent_span_id: string | null;
  trace_id: string;
  name: string;
  start_time: string | null;
  end_time: string | null;
  duration_ms: number | null;
  events: TimelineEvent[];
  status: "ok" | "error";
  metadata: Record<string, unknown>;
}

export interface Timeline {
  graph_id: string;
  total_events: number;
  total_duration_ms: number | null;
  spans: TimelineSpan[];
  events: TimelineEvent[];
}

/**
 * Maps event types to display icons
 */
export const EVENT_TYPE_ICONS: Record<TimelineEventType, string> = {
  // Agent lifecycle
  agent_started: "🤖",
  agent_completed: "✅",
  agent_failed: "❌",
  agent_heartbeat: "💓",
  agent_registered: "📝",
  // Task lifecycle
  task_queued: "📋",
  task_started: "▶️",
  task_completed: "✅",
  task_failed: "❌",
  task_retry: "🔄",
  task_assigned: "👤",
  // Sandbox lifecycle
  sandbox_created: "📦",
  sandbox_destroyed: "🗑️",
  command_started: "⚡",
  command_completed: "⚡",
  // Build events
  build_started: "🔨",
  build_completed: "🏗️",
  build_failed: "💥",
  dependency_installed: "📚",
  // Lock events
  lock_acquired: "🔒",
  lock_released: "🔓",
};

/**
 * Maps event types to display colors
 */
export const EVENT_TYPE_COLORS: Record<TimelineEventType, string> = {
  // Agent lifecycle
  agent_started: "text-blue-400",
  agent_completed: "text-green-400",
  agent_failed: "text-red-400",
  agent_heartbeat: "text-yellow-400",
  agent_registered: "text-purple-400",
  // Task lifecycle
  task_queued: "text-slate-400",
  task_started: "text-blue-400",
  task_completed: "text-green-400",
  task_failed: "text-red-400",
  task_retry: "text-yellow-400",
  task_assigned: "text-purple-400",
  // Sandbox lifecycle
  sandbox_created: "text-cyan-400",
  sandbox_destroyed: "text-slate-500",
  command_started: "text-orange-400",
  command_completed: "text-green-400",
  // Build events
  build_started: "text-blue-400",
  build_completed: "text-green-400",
  build_failed: "text-red-400",
  dependency_installed: "text-purple-400",
  // Lock events
  lock_acquired: "text-yellow-400",
  lock_released: "text-slate-400",
};

/**
 * Formats duration in milliseconds to human readable format
 */
export function formatDuration(ms: number | null): string {
  if (ms === null) return "-";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

/**
 * Formats timestamp to time string
 */
export function formatTimestamp(timestamp: string | null): string {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
