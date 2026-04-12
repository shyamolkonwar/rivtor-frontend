'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { JSX } from 'react';

// ===== TYPES =====

type MessageType = 'user' | 'system' | 'insight' | 'action' | 'result';

type Message = {
  id: string;
  type: MessageType;
  content: string | string[];
  timestamp?: Date;
  delay?: number;
};

type MetricValue = {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
};

// ===== EXECUTION FLOW DATA =====

const EXECUTION_FLOW: Message[] = [
  // Phase 1: User Input
  {
    id: '1',
    type: 'user',
    content: "We're losing users after signup. How do we fix it?",
    delay: 500,
  },
  // Phase 2: System Thinking
  {
    id: '2',
    type: 'system',
    content: 'Analyzing funnel...',
    delay: 800,
  },
  {
    id: '3',
    type: 'system',
    content: 'Identifying drop-off points...',
    delay: 600,
  },
  // Phase 3: Insight Reveal
  {
    id: '4',
    type: 'insight',
    content: [
      'Drop-off detected at onboarding step 2 (62%)',
      'Users not completing profile setup',
      'Time-to-value too high',
    ],
    delay: 900,
  },
  // Phase 4: Action
  {
    id: '5',
    type: 'action',
    content: [
      'Launching onboarding experiment A/B test',
      'Reducing required fields',
      'Introducing guided flow',
    ],
    delay: 700,
  },
  // Phase 5: Feedback Loop
  {
    id: '6',
    type: 'system',
    content: 'Monitoring results...',
    delay: 1200,
  },
  {
    id: '7',
    type: 'result',
    content: 'Early signal: +18% completion rate',
    delay: 800,
  },
  // Phase 6: Next Command
  {
    id: '8',
    type: 'user',
    content: 'We need revenue this month.',
    delay: 1500,
  },
  // Phase 7: Revenue Strategy
  {
    id: '9',
    type: 'system',
    content: 'Identifying fastest revenue paths...',
    delay: 800,
  },
  {
    id: '10',
    type: 'insight',
    content: [
      'Reactivating inactive users',
      'Introducing limited-time offer',
      'Targeting high-intent segments',
    ],
    delay: 700,
  },
  // Phase 8: Execution
  {
    id: '11',
    type: 'action',
    content: [
      'Deploying campaign',
      'Tracking conversions in real time',
    ],
    delay: 600,
  },
];

const METRICS_DATA: Record<string, MetricValue[]> = {
  funnel: [
    { label: 'Signup → Onboarding', value: '78%' },
    { label: 'Onboarding Step 2', value: '38%', highlight: true },
    { label: 'Profile Complete', value: '62%' },
    { label: 'Activation', value: '45%' },
  ],
  revenue: [
    { label: 'Projected Uplift', value: '+$3,200', trend: 'up', highlight: true },
    { label: 'Conversion Increase', value: '+12%', trend: 'up' },
    { label: 'Active Users', value: '2,847', trend: 'up' },
    { label: 'Engagement Rate', value: '68%', trend: 'neutral' },
  ],
};

// ===== COMPONENTS =====

interface HeaderProps {
  onClose: () => void;
}

function Header({ onClose }: HeaderProps): JSX.Element {
  return (
    <div
      style={{
        height: '64px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '15px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.9)',
          letterSpacing: '-0.02em',
        }}
      >
        Rivtor • Execution Session
      </motion.span>

      <button
        onClick={onClose}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
  onComplete: () => void;
}

function ChatMessage({ message, onComplete }: ChatMessageProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onComplete();
    }, message.delay || 600);

    return () => clearTimeout(timer);
  }, [message.delay, onComplete]);

  const isUser = message.type === 'user';
  const isInsight = message.type === 'insight' || message.type === 'result';

  const content = Array.isArray(message.content) ? message.content : [message.content];

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 8 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'flex',
        gap: '12px',
        marginBottom: isInsight ? '24px' : '16px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      {/* Avatar for Rivtor */}
      {!isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '11px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          RV
        </div>
      )}

      {/* Message Content */}
      <div
        style={{
          maxWidth: isUser ? '70%' : '85%',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {content.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              delay: prefersReducedMotion ? 0 : index * 0.15,
            }}
            style={{
              padding: isInsight ? '16px 20px' : '12px 16px',
              borderRadius: '12px',
              backgroundColor:
                message.type === 'insight'
                  ? 'rgba(34, 197, 94, 0.08)'
                  : message.type === 'result'
                    ? 'rgba(59, 130, 246, 0.08)'
                    : message.type === 'action'
                      ? 'rgba(168, 85, 247, 0.08)'
                      : isUser
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.03)',
              border:
                message.type === 'insight'
                  ? '1px solid rgba(34, 197, 94, 0.2)'
                  : message.type === 'result'
                    ? '1px solid rgba(59, 130, 246, 0.2)'
                    : message.type === 'action'
                      ? '1px solid rgba(168, 85, 247, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                margin: 0,
                color:
                  message.type === 'insight'
                    ? 'rgba(34, 197, 94, 0.95)'
                    : message.type === 'result'
                      ? 'rgba(59, 130, 246, 0.95)'
                      : message.type === 'action'
                        ? 'rgba(168, 85, 247, 0.95)'
                        : 'rgba(255, 255, 255, 0.85)',
                fontWeight: message.type === 'system' ? 400 : 500,
              }}
            >
              {line}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Avatar for User */}
      {isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '11px',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          ME
        </div>
      )}
    </motion.div>
  );
}

interface MetricsPanelProps {
  phase: string;
}

function MetricsPanel({ phase }: MetricsPanelProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const metrics = phase === 'revenue' ? METRICS_DATA.revenue : METRICS_DATA.funnel;

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        width: '320px',
        background: 'rgba(17, 17, 17, 0.8)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 16px 0',
          }}
        >
          {phase === 'revenue' ? 'Revenue Impact' : 'Funnel Analysis'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : index * 0.08,
              }}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: metric.highlight
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(255, 255, 255, 0.02)',
                border: metric.highlight
                  ? '1px solid rgba(255, 255, 255, 0.12)'
                  : '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: 400,
                  }}
                >
                  {metric.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {metric.trend && (
                    <span
                      style={{
                        fontSize: '10px',
                        color:
                          metric.trend === 'up'
                            ? 'rgba(34, 197, 94, 0.8)'
                            : metric.trend === 'down'
                              ? 'rgba(239, 68, 68, 0.8)'
                              : 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '14px',
                      color: metric.highlight
                        ? 'rgba(255, 255, 255, 0.95)'
                        : 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 600,
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status Indicator */}
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          background: 'rgba(34, 197, 94, 0.05)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              color: 'rgba(34, 197, 94, 0.9)',
              fontWeight: 500,
            }}
          >
            Execution Active
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface InputAreaProps {
  isProcessing: boolean;
}

function InputArea({ isProcessing }: InputAreaProps): JSX.Element {
  return (
    <div
      style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(10, 10, 10, 0.95)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '14px 18px',
          borderRadius: '12px',
          background: isProcessing
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {isProcessing ? (
          <>
            <div
              style={{
                width: '16px',
                height: '16px',
                display: 'flex',
                gap: '3px',
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
              ))}
            </div>
            <span>Processing...</span>
          </>
        ) : (
          <span>Describe what you need...</span>
        )}
      </div>
    </div>
  );
}

// ===== MAIN EXECUTION SESSION =====

interface ExecutionSessionProps {
  onClose: () => void;
}

export default function ExecutionSession({ onClose }: ExecutionSessionProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [metricsPhase, setMetricsPhase] = useState<'funnel' | 'revenue'>('funnel');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const visibleMessages = EXECUTION_FLOW.slice(0, currentMessageIndex + 1);
  const currentMessage = EXECUTION_FLOW[currentMessageIndex];
  const isProcessing = currentMessage?.type === 'system' || currentMessage?.type === 'action';

  const handleMessageComplete = useCallback(() => {
    // Update metrics phase based on message index
    if (currentMessageIndex === 4) {
      setMetricsPhase('funnel');
    } else if (currentMessageIndex === 8) {
      setMetricsPhase('revenue');
    }

    // Auto-advance to next message after a delay
    if (currentMessageIndex < EXECUTION_FLOW.length - 1) {
      const nextDelay = EXECUTION_FLOW[currentMessageIndex + 1]?.delay || 800;
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, nextDelay);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentMessageIndex]);

  // Reset on mount
  useEffect(() => {
    setCurrentMessageIndex(0);
    setMetricsPhase('funnel');
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          background: '#0A0A0A',
        }}
      >
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}</style>

        <Header onClose={onClose} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Chat Area */}
          <div
            ref={scrollContainerRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {visibleMessages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                onComplete={
                  index === visibleMessages.length - 1 ? handleMessageComplete : () => {}
                }
              />
            ))}
          </div>

          {/* Metrics Panel - Desktop Only */}
          <div
            style={{
              display: 'none',
            }}
            className="desktop-metrics"
          >
            <style>{`
              @media (min-width: 1024px) {
                .desktop-metrics {
                  display: block !important;
                }
              }
            `}</style>
            <MetricsPanel phase={metricsPhase} />
          </div>
        </div>

        <InputArea isProcessing={isProcessing} />
      </motion.div>
    </AnimatePresence>
  );
}
