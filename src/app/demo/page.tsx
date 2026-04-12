'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Hash, BarChart3, Activity, Sparkles, Zap, Target, X, Menu } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';

// ===== TYPES =====

type MessageType = 'user' | 'system' | 'insight' | 'action' | 'result' | 'decision' | 'learning';

type Message = {
  id: string;
  type: MessageType;
  content: string | string[];
  timestamp?: Date;
  delay?: number;
  metadata?: {
    options?: string[];
    selectedOption?: string;
    confidence?: number;
    agents?: string[];
  };
};

type ChannelContent = {
  messages: Message[];
  title: string;
  description: string;
};

// ===== CHANNEL CONTENT DATA =====

const CHANNEL_DATA: Record<string, ChannelContent> = {
  '1': {
    title: 'general',
    description: 'Team updates and announcements',
    messages: [
      {
        id: 'g1',
        type: 'system',
        content: 'Rivtor 01 initialized. Welcome to your execution intelligence system.',
        delay: 0,
      },
      {
        id: 'g2',
        type: 'insight',
        content: [
          'Rivtor 01 Capabilities Overview:',
          '',
          'Decision Intelligence',
          '  • Frame problems with context awareness',
          '  • Generate 3-5 strategic options',
          '  • Multi-agent reasoning for evaluation',
          '  • Confidence scoring on all decisions',
          '',
          'Execution Management',
          '  • Task Graph creation and dependency resolution',
          '  • Automatic resource allocation',
          '  • Progress tracking and optimization',
          '',
          'Learning System',
          '  • World Model predicts outcomes',
          '  • Real-time pattern recognition',
          '  • Memory updates from actual vs expected',
          '',
          'Type your goals in #execution channel to get started.',
        ],
        delay: 400,
        metadata: {
          agents: ['Rivtor 01 Core'],
        },
      },
    ],
  },
  '2': {
    title: 'execution',
    description: 'Active goal execution sessions',
    messages: [
      {
        id: '1',
        type: 'user',
        content: "We need to increase signups by 50% this quarter. Current signup rate is stuck at 3.2%.",
        delay: 600,
      },
      {
        id: '2',
        type: 'system',
        content: 'Rivtor 01 Decision Engine: Framing problem...',
        delay: 800,
      },
      {
        id: '3',
        type: 'decision',
        content: 'Problem Frame Identified',
        delay: 1000,
        metadata: {
          confidence: 0.92,
          agents: ['Decision Engine', 'Context Analyzer'],
        },
      },
      {
        id: '4',
        type: 'system',
        content: 'Generating strategic options with multi-agent reasoning...',
        delay: 900,
      },
      {
        id: '5',
        type: 'insight',
        content: [
          'Option A: Fix login UX only',
          '  • Effort: 2 weeks',
          '  • Expected uplift: +15%',
          '  • Risk: Low',
          '',
          'Option B: Social login integration',
          '  • Effort: 3 weeks',
          '  • Expected uplift: +25%',
          '  • Risk: Medium',
          '',
          'Option C: Referral program + UX improvements',
          '  • Effort: 6 weeks',
          '  • Expected uplift: +50%',
          '  • Risk: Medium',
          '',
          'Option D: Complete onboarding redesign',
          '  • Effort: 12 weeks',
          '  • Expected uplift: +80%',
          '  • Risk: High',
        ],
        delay: 1200,
        metadata: {
          options: ['Fix login UX', 'Social login', 'Referral + UX', 'Onboarding redesign'],
          agents: ['Strategic Analysis System'],
        },
      },
      {
        id: '6',
        type: 'system',
        content: 'Evaluating options with Intelligence Layers...',
        delay: 800,
      },
      {
        id: '7',
        type: 'insight',
        content: [
          'Taste System: Option C balances impact with feasibility',
          'World Model: Option C has 74% success probability',
          'Uncertainty Handler: Option C risk within acceptable bounds',
          'Resource Check: Within current budget constraints',
        ],
        delay: 1000,
        metadata: {
          confidence: 0.87,
          agents: ['Taste System', 'World Model', 'Uncertainty Handler'],
        },
      },
      {
        id: '8',
        type: 'decision',
        content: 'Selected Option C: Referral program + UX improvements',
        delay: 900,
        metadata: {
          selectedOption: 'Option C',
          confidence: 0.87,
          agents: ['Decision Engine'],
        },
      },
      {
        id: '9',
        type: 'system',
        content: 'Creating execution plan with Task Graph Manager...',
        delay: 700,
      },
      {
        id: '10',
        type: 'action',
        content: [
          'Task Graph created with 8 tasks:',
          '  → Redesign login flow (3 days)',
          '  → Build referral tracking system (4 days)',
          '  → Set up analytics dashboard (2 days)',
          '  → Create user testing protocol (2 days)',
          '  → Build referral landing page (3 days)',
          '  → Implement notification system (3 days)',
          '  → Create automated testing suite (3 days)',
          '  → Deploy to production [approval required] (1 day)',
        ],
        delay: 1100,
        metadata: {
          agents: ['Task Graph Manager'],
        },
      },
      {
        id: '11',
        type: 'system',
        content: 'Executing tasks...',
        delay: 600,
      },
      {
        id: '12',
        type: 'action',
        content: [
          '✓ Login flow redesigned',
          '✓ Referral tracking API built',
          '✓ Analytics dashboard ready',
          '→ Testing in progress...',
        ],
        delay: 1400,
        metadata: {
          agents: ['Rivtor 01'],
        },
      },
      {
        id: '13',
        type: 'system',
        content: 'World Model comparing predicted vs actual outcomes...',
        delay: 800,
      },
      {
        id: '14',
        type: 'learning',
        content: [
          'Expected: 50% signup increase in 6 weeks',
          'Current (week 2): +22% signup increase',
          'Trend: Above trajectory',
          'Learning: Referral programs convert 3.2x better than expected',
          'Memory Update: Reinforcing referral-first growth patterns',
        ],
        delay: 1200,
        metadata: {
          confidence: 0.94,
          agents: ['World Model', 'Memory System', 'Decision Engine'],
        },
      },
    ],
  },
  '3': {
    title: 'decisions',
    description: 'Decision history and rationale',
    messages: [
      {
        id: 'd1',
        type: 'system',
        content: 'Decision History - Last 30 Days',
        delay: 0,
      },
      {
        id: 'd2',
        type: 'decision',
        content: 'Decision #47: Signup Growth Strategy',
        delay: 300,
        metadata: {
          confidence: 0.87,
          agents: ['Decision Engine'],
        },
      },
      {
        id: 'd3',
        type: 'insight',
        content: [
          'Problem: Signup rate stuck at 3.2%',
          '',
          'Options Generated: 4',
          '  • Fix login UX only (+15% expected)',
          '  • Social login (+25% expected)',
          '  • Referral + UX improvements (+50% expected) ← SELECTED',
          '  • Onboarding redesign (+80% expected)',
          '',
          'Reasoning:',
          '  • Taste System: Option C optimal balance of impact/feasibility',
          '  • World Model: 74% success probability',
          '  • Resource Check: Fits Q1 budget',
          '',
          'Outcome (Week 2): +22% signup increase',
          'Learning: Referral programs exceed expectations',
        ],
        delay: 500,
        metadata: {
          agents: ['Decision Engine', 'Taste System', 'World Model'],
        },
      },
      {
        id: 'd4',
        type: 'decision',
        content: 'Decision #42: Infrastructure Scaling',
        delay: 300,
        metadata: {
          confidence: 0.91,
          agents: ['Decision Engine'],
        },
      },
      {
        id: 'd5',
        type: 'insight',
        content: [
          'Problem: Database slowdown during peak hours',
          '',
          'Options Generated: 3',
          '  • Add read replicas (+40% capacity, 2 weeks)',
          '  • Implement caching (+60% capacity, 1 week) ← SELECTED',
          '  • Complete migration (+200% capacity, 8 weeks)',
          '',
          'Outcome: +55% capacity, under budget',
        ],
        delay: 500,
      },
      {
        id: 'd6',
        type: 'decision',
        content: 'Decision #38: Customer Support Automation',
        delay: 300,
        metadata: {
          confidence: 0.78,
          agents: ['Decision Engine'],
        },
      },
      {
        id: 'd7',
        type: 'result',
        content: [
          'Selected: AI chatbot for tier 1 queries',
          'Expected: 40% reduction in response time',
          'Actual: 52% reduction',
          'Status: Success - patterns updated',
        ],
        delay: 500,
      },
    ],
  },
  '4': {
    title: 'learning',
    description: 'System learning and pattern recognition',
    messages: [
      {
        id: 'l1',
        type: 'system',
        content: 'Rivtor 01 Learning Dashboard',
        delay: 0,
      },
      {
        id: 'l2',
        type: 'insight',
        content: [
          'World Model Performance',
          '',
          'Prediction Accuracy: 94%',
          '  • Signup growth predictions: ±3% error',
          '  • Churn predictions: ±5% error',
          '  • Performance predictions: ±2% error',
          '',
          'Patterns Learned: 147',
          '  • Referral programs convert 3.2x better than expected',
          '  • Users who complete onboarding in 24h have 2.8x retention',
          '  • Friday deployments have 40% more issues',
          '  • Mobile users respond 2.1x faster to notifications',
        ],
        delay: 400,
        metadata: {
          agents: ['World Model', 'Memory System'],
        },
      },
      {
        id: 'l3',
        type: 'learning',
        content: [
          'Recent Learning Updates',
          '',
          '2 hours ago:',
          '  "Referral-first growth patterns work" reinforced',
          '  Confidence: 0.94 → 0.97',
          '',
          'Yesterday:',
          '  "Friday deployments risky" pattern updated',
          '  Now scheduling deployments for Mon-Thu',
          '',
          '3 days ago:',
          '  "Mobile users more responsive" pattern identified',
          '  Adjusted notification strategy',
        ],
        delay: 600,
        metadata: {
          agents: ['Memory System'],
        },
      },
      {
        id: 'l4',
        type: 'insight',
        content: [
          'Decision Quality Trend',
          '',
          'Last 30 days:',
          '  • 47 decisions made',
          '  • 89% achieved expected outcomes',
          '  • 8% exceeded expectations',
          '  • 3% below expectations (all adjusted)',
          '',
          'Average confidence: 0.86',
          'Average accuracy: 0.91',
        ],
        delay: 500,
      },
    ],
  },
};

type MetricValue = {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
};

type Channel = {
  id: string;
  name: string;
  type: 'text' | 'metrics';
  unread?: number;
};

const CHANNELS: Channel[] = [
  { id: '1', name: 'general', type: 'text' },
  { id: '2', name: 'execution', type: 'text' },
  { id: '3', name: 'decisions', type: 'text' },
  { id: '4', name: 'learning', type: 'text' },
];

const METRICS_DATA: Record<string, MetricValue[]> = {
  '1': [
    { label: 'System Status', value: 'Operational', highlight: true },
    { label: 'Decisions Made', value: '47' },
    { label: 'Accuracy Rate', value: '91%', trend: 'up' },
    { label: 'Uptime', value: '99.9%', trend: 'up' },
  ],
  '2': [
    { label: 'Tasks Completed', value: '4/8', highlight: true },
    { label: 'Tasks In Progress', value: '4', trend: 'up' },
    { label: 'Timeline Progress', value: 'Week 2/6' },
    { label: 'Signup Uplift', value: '+22%', trend: 'up', highlight: true },
  ],
  '3': [
    { label: 'Total Decisions', value: '47' },
    { label: 'Success Rate', value: '89%', trend: 'up' },
    { label: 'Exceeded Expectations', value: '8%' },
    { label: 'Avg Confidence', value: '86%', trend: 'up' },
  ],
  '4': [
    { label: 'Prediction Accuracy', value: '94%', trend: 'up', highlight: true },
    { label: 'Patterns Learned', value: '147', trend: 'up' },
    { label: 'Memory Updates', value: '2,341', trend: 'up' },
    { label: 'Learning Rate', value: '+12/day', trend: 'up' },
  ],
};

// ===== RIVTOR BRAND COLORS =====

const RIVTOR_COLORS = {
  bgPrimary: '#0A0A0A',
  bgSecondary: '#111111',
  surface1: '#141414',
  surface2: '#1A1A1A',
  surface3: '#222222',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  accentPrimary: 'rgba(255, 255, 255, 0.1)',
  accentSoft: 'rgba(255, 255, 255, 0.08)',
  accentHover: 'rgba(255, 255, 255, 0.15)',
  borderSoft: 'rgba(255, 255, 255, 0.08)',
  borderStrong: '#27272A',
  white: '#FFFFFF',
};

// ===== RESPONSIVE SIDEBAR =====

function MobileSidebar({
  channels,
  activeChannel,
  onSelectChannel,
  isOpen,
  onClose,
}: {
  channels: Channel[];
  activeChannel: string;
  onSelectChannel: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40,
            }}
          />
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: '280px',
              backgroundColor: RIVTOR_COLORS.bgSecondary,
              borderRight: `1px solid ${RIVTOR_COLORS.borderSoft}`,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px',
                borderBottom: `1px solid ${RIVTOR_COLORS.borderSoft}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: RIVTOR_COLORS.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: RIVTOR_COLORS.bgPrimary,
                  }}
                >
                  R
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: RIVTOR_COLORS.textPrimary,
                      fontFamily: 'var(--font-headline)',
                      letterSpacing: '-0.02em',
                      display: 'block',
                    }}
                  >
                    Rivtor 01
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: RIVTOR_COLORS.textMuted,
                      fontWeight: 400,
                      display: 'block',
                    }}
                  >
                    Execution Intelligence
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: RIVTOR_COLORS.textSecondary,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Channels */}
            <div
              style={{
                flex: 1,
                padding: '12px 8px',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: RIVTOR_COLORS.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '8px 8px 4px',
                }}
              >
                Channels
              </div>
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => {
                    onSelectChannel(channel.id);
                    onClose();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: activeChannel === channel.id ? RIVTOR_COLORS.accentPrimary : 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    marginBottom: '4px',
                  }}
                >
                  <Hash size={16} style={{ color: RIVTOR_COLORS.textSecondary }} />
                  <span
                    style={{
                      fontSize: '14px',
                      color: RIVTOR_COLORS.textPrimary,
                      fontWeight: 500,
                      flex: 1,
                      textAlign: 'left',
                    }}
                  >
                    {channel.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DesktopSidebar({
  channels,
  activeChannel,
  onSelectChannel,
}: {
  channels: Channel[];
  activeChannel: string;
  onSelectChannel: (id: string) => void;
}) {
  return (
    <div
      style={{
        width: '260px',
        backgroundColor: RIVTOR_COLORS.bgSecondary,
        borderRight: `1px solid ${RIVTOR_COLORS.borderSoft}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Workspace Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: `1px solid ${RIVTOR_COLORS.borderSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: RIVTOR_COLORS.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: RIVTOR_COLORS.bgPrimary,
          }}
        >
          R
        </div>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: RIVTOR_COLORS.textPrimary,
              fontFamily: 'var(--font-headline)',
              letterSpacing: '-0.02em',
              display: 'block',
            }}
          >
            Rivtor 01
          </span>
          <span
            style={{
              fontSize: '11px',
              color: RIVTOR_COLORS.textMuted,
              fontWeight: 400,
              display: 'block',
            }}
          >
            Execution Intelligence
          </span>
        </div>
      </div>

      {/* Channels */}
      <div
        style={{
          flex: 1,
          padding: '12px 8px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: RIVTOR_COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '8px 8px 4px',
          }}
        >
          Channels
        </div>
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => onSelectChannel(channel.id)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: activeChannel === channel.id ? RIVTOR_COLORS.accentPrimary : 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (activeChannel !== channel.id) {
                e.currentTarget.style.backgroundColor = RIVTOR_COLORS.accentSoft;
              }
            }}
            onMouseLeave={(e) => {
              if (activeChannel !== channel.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Hash size={16} style={{ color: RIVTOR_COLORS.textSecondary }} />
            <span
              style={{
                fontSize: '14px',
                color: RIVTOR_COLORS.textPrimary,
                fontWeight: 500,
              }}
            >
              {channel.name}
            </span>
          </button>
        ))}

        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: RIVTOR_COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '16px 8px 4px',
          }}
        >
          System Status
        </div>

        <div
          style={{
            padding: '12px',
            borderRadius: '8px',
            background: RIVTOR_COLORS.accentSoft,
            border: `1px solid ${RIVTOR_COLORS.borderSoft}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: RIVTOR_COLORS.white,
              }}
            />
            <span style={{ fontSize: '12px', color: RIVTOR_COLORS.textPrimary, fontWeight: 500 }}>
              All Systems Operational
            </span>
          </div>
          <div style={{ fontSize: '11px', color: RIVTOR_COLORS.textMuted }}>
            Decision Engine: Active<br />
            World Model: Learning<br />
            Task Graph: 4 running
          </div>
        </div>
      </div>

      {/* User Section */}
      <div
        style={{
          padding: '12px',
          borderTop: `1px solid ${RIVTOR_COLORS.borderSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: RIVTOR_COLORS.accentPrimary,
            border: `1px solid ${RIVTOR_COLORS.borderSoft}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: RIVTOR_COLORS.textPrimary,
          }}
        >
          YO
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: RIVTOR_COLORS.textPrimary,
            }}
          >
            You
          </div>
          <div
            style={{
              fontSize: '12px',
              color: RIVTOR_COLORS.textMuted,
            }}
          >
            Active
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricsCard({ metric }: { metric: MetricValue }) {
  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: '10px',
        background: metric.highlight ? RIVTOR_COLORS.accentPrimary : RIVTOR_COLORS.accentSoft,
        border: metric.highlight ? `1px solid ${RIVTOR_COLORS.borderStrong}` : `1px solid ${RIVTOR_COLORS.borderSoft}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: RIVTOR_COLORS.textSecondary,
            fontWeight: 400,
          }}
        >
          {metric.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {metric.trend && (
            <span
              style={{
                fontSize: '9px',
                color: metric.trend === 'up' ? RIVTOR_COLORS.textPrimary : RIVTOR_COLORS.textMuted,
              }}
            >
              {metric.trend === 'up' ? '↑' : '→'}
            </span>
          )}
          <span
            style={{
              fontSize: '13px',
              color: metric.highlight ? RIVTOR_COLORS.textPrimary : RIVTOR_COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            {metric.value}
          </span>
        </div>
      </div>
    </div>
  );
}

function MetricsPanel({ channelId }: { channelId: string }) {
  const metrics = METRICS_DATA[channelId] || [];
  const channelData = CHANNEL_DATA[channelId];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Activity size={16} style={{ color: RIVTOR_COLORS.textSecondary }} />
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: RIVTOR_COLORS.textPrimary,
            margin: 0,
            fontFamily: 'var(--font-headline)',
            letterSpacing: '-0.02em',
          }}
        >
          {channelData.title}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {metrics.map((metric) => (
          <MetricsCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div
        style={{
          padding: '12px 14px',
          borderRadius: '10px',
          background: RIVTOR_COLORS.accentPrimary,
          border: `1px solid ${RIVTOR_COLORS.borderSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Zap size={14} style={{ color: RIVTOR_COLORS.textPrimary }} />
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: '12px',
              color: RIVTOR_COLORS.textPrimary,
              fontWeight: 500,
              display: 'block',
            }}
          >
            Intelligence Active
          </span>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps): JSX.Element {
  const isUser = message.type === 'user';
  const isInsight = message.type === 'insight';
  const isDecision = message.type === 'decision';
  const isLearning = message.type === 'learning';
  const isResult = message.type === 'result';

  const content = Array.isArray(message.content) ? message.content : [message.content];

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: isInsight || isLearning ? '20px' : '14px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      {!isUser && (
        <>
          {message.metadata?.agents ? (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: RIVTOR_COLORS.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Target size={16} style={{ color: RIVTOR_COLORS.bgPrimary }} />
            </div>
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: RIVTOR_COLORS.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: RIVTOR_COLORS.bgPrimary,
                fontSize: '13px',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              R
            </div>
          )}
        </>
      )}

      <div
        style={{
          maxWidth: isUser ? '75%' : '92%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {message.metadata?.agents && (
          <span
            style={{
              fontSize: '10px',
              color: RIVTOR_COLORS.textMuted,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {message.metadata.agents.join(' • ')}
          </span>
        )}

        {content.map((line, index) => (
          <div
            key={index}
            style={{
              padding: isInsight || isLearning || isDecision || isResult ? '14px 16px' : '10px 14px',
              borderRadius: '10px',
              backgroundColor: isUser
                ? RIVTOR_COLORS.surface3
                : isDecision
                  ? RIVTOR_COLORS.accentPrimary
                  : isLearning
                    ? RIVTOR_COLORS.accentPrimary
                    : message.type === 'action'
                      ? RIVTOR_COLORS.surface2
                      : message.type === 'system'
                        ? 'transparent'
                        : isResult
                          ? RIVTOR_COLORS.accentPrimary
                          : RIVTOR_COLORS.accentSoft,
              border:
                isDecision || isLearning || isResult
                  ? `1px solid ${RIVTOR_COLORS.borderStrong}`
                  : `1px solid ${RIVTOR_COLORS.borderSoft}`,
            }}
          >
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                margin: 0,
                color: RIVTOR_COLORS.textPrimary,
                fontWeight: message.type === 'system' ? 400 : 500,
                whiteSpace: 'pre-wrap',
                fontFamily: message.type === 'system' || isUser ? 'var(--font-body)' : 'var(--font-mono)',
              }}
            >
              {line}
            </p>
          </div>
        ))}

        {message.metadata?.confidence && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              fontSize: '10px',
              color: RIVTOR_COLORS.textMuted
            }}
          >
            <span>Confidence: {(message.metadata.confidence * 100).toFixed(0)}%</span>
            {message.metadata.selectedOption && (
              <span>Selected: {message.metadata.selectedOption}</span>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: RIVTOR_COLORS.accentPrimary,
            border: `1px solid ${RIVTOR_COLORS.borderSoft}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: RIVTOR_COLORS.textPrimary,
            fontSize: '12px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          YO
        </div>
      )}
    </div>
  );
}

// ===== MAIN PAGE =====

export default function DemoPage() {
  const [activeChannel, setActiveChannel] = useState('2');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const channelData = CHANNEL_DATA[activeChannel];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: RIVTOR_COLORS.bgPrimary,
        color: RIVTOR_COLORS.textPrimary,
        fontFamily: 'var(--font-body)',
      }}
    >
    <>
      <style>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        *::-webkit-scrollbar {
          width: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
      `}</style>
      <style>{`
        @media (min-width: 1024px) {
          .desktop-sidebar {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-sidebar {
            display: none !important;
          }
          .metrics-panel {
            display: none !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1279px) {
          .metrics-panel {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Sidebar */}
      <MobileSidebar
        channels={CHANNELS}
        activeChannel={activeChannel}
        onSelectChannel={setActiveChannel}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <DesktopSidebar channels={CHANNELS} activeChannel={activeChannel} onSelectChannel={setActiveChannel} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            height: '56px',
            minHeight: '56px',
            borderBottom: `1px solid ${RIVTOR_COLORS.borderSoft}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px',
          }}
        >
          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: RIVTOR_COLORS.textSecondary,
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Menu size={20} />
          </button>

          {/* Back link - hide on very small screens */}
          <Link
            href="/"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '6px',
              color: RIVTOR_COLORS.textSecondary,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'all 0.15s ease',
            }}
            className="desktop-only"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = RIVTOR_COLORS.accentSoft;
              e.currentTarget.style.color = RIVTOR_COLORS.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = RIVTOR_COLORS.textSecondary;
            }}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </Link>

          <div style={{ width: '1px', height: '20px', background: RIVTOR_COLORS.borderStrong }} />

          <Hash size={16} style={{ color: RIVTOR_COLORS.textMuted }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-headline)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {channelData.title}
            </span>
            <span style={{ fontSize: '12px', color: RIVTOR_COLORS.textMuted, marginLeft: '8px' }}>
              {channelData.description}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: RIVTOR_COLORS.accentPrimary,
              border: `1px solid ${RIVTOR_COLORS.borderSoft}`,
            }}
          >
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: RIVTOR_COLORS.white,
              }}
            />
            <span style={{ fontSize: '11px', color: RIVTOR_COLORS.textPrimary, fontWeight: 500 }}>
              {activeChannel === '2' ? 'Live' : 'View'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Chat Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
            }}
          >
            <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChannel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {channelData.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Metrics Panel - Desktop only */}
          <div
            className="metrics-panel"
            style={{
              width: '280px',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px',
              overflowY: 'auto',
            }}
          >
            <MetricsPanel channelId={activeChannel} />
          </div>
        </div>

        {/* Input Area - Only show in execution channel */}
        {activeChannel === '2' && (
          <div
            style={{
              padding: '12px 16px 16px',
              background: RIVTOR_COLORS.bgPrimary,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: RIVTOR_COLORS.surface2,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: RIVTOR_COLORS.textMuted,
                fontSize: '13px',
              }}
            >
              Describe your goal...
            </div>
          </div>
        )}
      </div>
      </>
    </div>
  );
}
