'use client';

type LoaderSize = 'sm' | 'md' | 'lg';

interface ExecutionPulseProps {
  size?: LoaderSize;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

/**
 * ExecutionPulse Loader - Minimal Pulse Line
 * 
 * A thin line that moves continuously, like signal processing.
 * Visual: ───────────▁▂▃▄▅▆▅▄▃▂▁───────────
 * Meaning: "Rivtor is processing something complex"
 */
export function ExecutionPulse({
  size = 'md',
  message,
  fullScreen = false,
  className = '',
}: ExecutionPulseProps) {
  const getSizeClasses = (sz: LoaderSize) => {
    switch (sz) {
      case 'sm':
        return 'h-1 w-16';
      case 'md':
        return 'h-1.5 w-24';
      case 'lg':
        return 'h-2 w-32';
      default:
        return 'h-1.5 w-24';
    }
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-[#0A0A0A] z-50'
    : '';

  const innerClass = fullScreen ? 'flex flex-col items-center gap-4' : '';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className={innerClass}>
        <MinimalPulseLine size={size} sizeClasses={getSizeClasses(size)} />
        {message && (
          <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-[Inter,system-ui,-apple-system,'Segoe UI',sans-serif] mt-2 text-center max-w-xs">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Minimal Pulse Line - Signal Processing Effect
 * Thin line that moves left→right, like a waveform signal
 */
function MinimalPulseLine({
  size,
  sizeClasses,
}: {
  size: LoaderSize;
  sizeClasses: string;
}) {
  return (
    <div className={`${sizeClasses} relative overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]`}>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          backgroundSize: '200% 100%',
          animation: 'pulse-wave 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}

/**
 * Inline Execution Pulse with Message
 * For command execution states
 */
interface InlineExecutionProps {
  message: string;
}

export function InlineExecution({
  message,
}: InlineExecutionProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-12 relative overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
        <div
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            backgroundSize: '200% 100%',
            animation: 'pulse-wave 1.5s ease-in-out infinite',
          }}
          className="absolute inset-0"
        />
      </div>
      <span className="text-[13px] text-[rgba(255,255,255,0.7)] font-[Inter,system-ui,-apple-system,'Segoe UI',sans-serif]">
        {message}
      </span>
    </div>
  );
}

/**
 * Fullscreen Loader for Auth Pages
 */
export function FullscreenExecutionPulse({ message = 'Setting up your workspace...' }: { message?: string }) {
  return (
    <ExecutionPulse
      size="lg"
      message={message}
      fullScreen
    />
  );
}
