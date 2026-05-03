'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';
import {
  BarChart3,
  Brain,
  CheckCircle2,
  Command,
  FileCode,
  Home,
  Rocket,
  Settings,
  Wrench,
  Zap,
} from 'lucide-react';

const PLAN_STEPS = [
  { label: 'Define positioning', status: 'done' },
  { label: 'Write content', status: 'done' },
  { label: 'Build page', status: 'active' },
  { label: 'Deploy', status: 'pending' },
];

const CODE_LINES = [
  "const headline = 'See every signal in real time';",
  "const subtext = 'Analytics that move as fast as your team';",
  '',
  'export default function LandingPage() {',
  '  return <Hero headline={headline} subtext={subtext} />;',
  '}',
];

const TABS = [
  { label: 'Code', count: '3', icon: FileCode },
  { label: 'Tools', count: '4', icon: Wrench },
  { label: 'Metrics', count: '2', icon: BarChart3 },
];

export default function ProductGlimpseSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="product-glimpse"
      className="relative overflow-hidden"
      aria-labelledby="product-glimpse-title"
      style={{
        paddingTop: 'clamp(90px, 11vw, 150px)',
        paddingBottom: 'clamp(90px, 11vw, 150px)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: '880px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.026) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="rv-container-v4 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2
            id="product-glimpse-title"
            className="font-semibold text-white"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-headline)',
            }}
          >
            A glimpse of execution.
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)',
            }}
          >
            Goal to deploy, in one flow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[30px]"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.012) 100%)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.32)',
          }}
        >
          <div
            className="flex items-center justify-between gap-4 px-4 md:px-5 h-14"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.14)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Command className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.36)' }} />
                <span
                  className="truncate"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Launch landing page
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full"
                style={{
                  color: 'rgba(255,255,255,0.42)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                planning
              </span>
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full"
                style={{
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                01 active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[48px_minmax(0,1fr)] lg:grid-cols-[48px_minmax(0,1fr)_320px] min-h-[620px] lg:min-h-[560px]">
            <div
              className="flex flex-col items-center py-3 gap-2"
              style={{ borderRight: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.14)' }}
            >
              <IconDockButton icon={Home} />
              <IconDockButton icon={Zap} active />
              <IconDockButton icon={Rocket} />
              <div className="flex-1" />
              <IconDockButton icon={Settings} />
            </div>

            <div className="min-w-0 flex flex-col" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-5">
                <div className="flex justify-end">
                  <div
                    className="max-w-[440px] rounded-2xl p-4"
                    style={{
                      border: '1px solid rgba(255,255,255,0.09)',
                      background: 'rgba(255,255,255,0.045)',
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        Goal
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                        User
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.86)',
                        fontSize: '14px',
                        lineHeight: 1.55,
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Launch a landing page for the new analytics product.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AgentAvatar />
                  <div
                    className="max-w-[520px] rounded-2xl p-4"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(0,0,0,0.16)',
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Brain className="w-4 h-4 mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
                      <p
                        style={{
                          color: '#FFFFFF',
                          fontSize: '14px',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        01 decided to lead with speed, clarity, and proof.
                      </p>
                    </div>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.48)',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Positioning first. Then content, build, and deploy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AgentAvatar muted />
                  <div
                    className="w-full max-w-[560px] rounded-2xl p-4 md:p-5"
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(0,0,0,0.16)',
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        Plan
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                        4 steps
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {PLAN_STEPS.map((step, index) => (
                        <div
                          key={step.label}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                          style={{ background: 'rgba(255,255,255,0.025)' }}
                        >
                          <StepStatus status={step.status} index={index} />
                          <span
                            style={{
                              color: step.status === 'pending' ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.8)',
                              fontSize: '13px',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl p-3" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                          Current action
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
                          76%
                        </span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.74)', fontSize: '13px', margin: '0 0 10px 0', fontFamily: 'var(--font-body)' }}>
                        Building the page and preparing deploy.
                      </p>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'rgba(255,255,255,0.5)' }}
                          initial={{ width: prefersReducedMotion ? '76%' : 0 }}
                          whileInView={{ width: '76%' }}
                          viewport={{ once: true, amount: 0.7 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 min-w-0 flex flex-col" style={{ background: 'rgba(0,0,0,0.12)' }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#FFFFFF', fontSize: '13px', fontFamily: 'var(--font-body)' }}>Evidence</span>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  live
                </span>
              </div>

              <div className="flex gap-1 p-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {TABS.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = index === 0;

                  return (
                    <div
                      key={tab.label}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.42)',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">{tab.label}</span>
                      <span
                        className="font-mono text-[10px] px-1 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        {tab.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 flex flex-col min-h-[280px]">
                <div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    landing/page.tsx
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    +42
                  </span>
                </div>

                <div className="px-3 py-3 flex-1" style={{ background: 'rgba(0,0,0,0.14)' }}>
                  {CODE_LINES.map((line, index) => (
                    <div key={`${line}-${index}`} className="flex gap-3">
                      <span
                        className="select-none shrink-0 text-right"
                        style={{
                          width: '18px',
                          color: 'rgba(255,255,255,0.22)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1.7,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span
                        style={{
                          color: line.startsWith('const') ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.5)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1.7,
                          whiteSpace: 'pre',
                        }}
                      >
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="rounded-xl p-3" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.24)', margin: '0 0 6px 0' }}>
                      Tools
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px', margin: 0, fontFamily: 'var(--font-body)' }}>
                      Writer, Builder, Deploy
                    </p>
                  </div>
                  <div className="rounded-xl p-3" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.24)', margin: '0 0 6px 0' }}>
                      Status
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '12px', margin: 0, fontFamily: 'var(--font-body)' }}>
                      Preview ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IconDockButton({
  icon: Icon,
  active = false,
}: {
  icon: typeof Home;
  active?: boolean;
}): JSX.Element {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-lg"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.38)',
      }}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
}

function AgentAvatar({ muted = false }: { muted?: boolean }): JSX.Element {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: muted ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
      }}
    >
      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.76)' }}>
        01
      </span>
    </div>
  );
}

function StepStatus({ status, index }: { status: string; index: number }): JSX.Element {
  if (status === 'done') {
    return <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.72)' }} />;
  }

  if (status === 'active') {
    return (
      <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <motion.span
          className="absolute h-4 w-4 rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="h-2 w-2 rounded-full" style={{ background: '#FFFFFF' }} />
      </div>
    );
  }

  return (
    <div
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
      style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.28)' }}
    >
      <span className="font-mono" style={{ fontSize: '9px' }}>
        {index + 1}
      </span>
    </div>
  );
}
