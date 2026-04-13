'use client';

import type { JSX, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = '', delay = 0 }: RevealProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const capabilities = [
  {
    title: 'Cross-Functional Execution at Scale',
    flow: 'Strategy → Decision → Multi-System Execution → Outcome',
    content: `Rivtor enables execution across:

product
operations
growth
infrastructure

It:

coordinates workflows across functions
manages dependencies across systems
ensures alignment with strategic objectives

Result:
Execution that scales without fragmentation.`,
  },
  {
    title: 'Decision Traceability & Accountability',
    flow: 'Decision → Execution → Outcome → Audit Trail',
    content: `Every action in Rivtor is:

linked to a decision
recorded with context
evaluated based on outcome

This provides:

full auditability
clear ownership
measurable impact

Result:
Decisions are no longer invisible — they are traceable and accountable.`,
  },
  {
    title: 'Continuous Operational Visibility',
    flow: 'System Activity → Real-Time State → Insights → Action',
    content: `Rivtor maintains a continuous view of:

system state
workflow progress
emerging risks

It surfaces:

bottlenecks
anomalies
performance gaps

Result:
Leaders see what is happening — as it happens.`,
  },
  {
    title: 'Autonomous Execution With Governance',
    flow: 'Execution → Validation → Policy Enforcement → Controlled Action',
    content: `Rivtor executes autonomously — but never without control.

It enforces:

policy constraints
risk thresholds
approval layers when required

Result:
Speed without loss of control.`,
  },
  {
    title: 'System-Level Learning & Optimization',
    flow: 'Execution → Outcome → Evaluation → System Update',
    content: `Rivtor:

evaluates outcomes continuously
identifies inefficiencies
updates future execution strategies

This creates:

compounding intelligence
continuous improvement across the organization

Result:
The system improves as it operates.`,
  },
];

const executiveValue = [
  {
    title: 'For CEOs',
    points: [
      'Align strategy with execution',
      'Reduce organizational friction',
      'Increase speed of decision-making',
    ],
  },
  {
    title: 'For COOs',
    points: [
      'Ensure operational consistency',
      'Improve execution reliability',
      'Reduce coordination overhead',
    ],
  },
  {
    title: 'For CTOs',
    points: [
      'Maintain system-wide visibility',
      'Control execution across infrastructure',
      'Ensure scalable architecture alignment',
    ],
  },
  {
    title: 'For CFOs',
    points: [
      'Improve efficiency of execution',
      'Reduce operational waste',
      'Increase ROI on initiatives',
    ],
  },
];

export default function ForEnterprisePage(): JSX.Element {
  return (
    <main className="rv-landing-v4">
      <style>{`
        @media (max-width: 768px) {
          .enterprise-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .enterprise-grid-3 {
            grid-template-columns: 1fr !important;
          }
          .enterprise-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .enterprise-hero {
            font-size: 32px !important;
          }
          .enterprise-section-title {
            font-size: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .enterprise-grid-4 {
            grid-template-columns: 1fr !important;
          }
          .enterprise-hero {
            font-size: 28px !important;
          }
        }
      `}</style>
      <Navbar />

      {/* Navbar spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="rv-section-v4" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Solutions for Enterprise
              </p>
              <h1
                className="enterprise-hero"
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Operate Complex Organizations With Controlled Intelligence
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor enables enterprises to move from fragmented execution to decision-driven, governed,
                and continuously improving systems.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enterprise Reality */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2
                className="enterprise-section-title"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  textAlign: 'center',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Complexity Scales Faster Than Control
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                As organizations grow:
              </p>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    systems multiply
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    workflows fragment
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    decisions become slower
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    execution becomes inconsistent
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '32px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                You don't lose capability — you lose alignment and control.
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                This leads to:
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    siloed operations
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    delayed execution
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    inconsistent outcomes
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    lack of visibility across systems
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '32px',
                  marginBottom: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                At scale, the problem is not execution.
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '8px',
                  marginBottom: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                It's coordinating execution reliably.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Shift */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '48px 32px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
              }}
            >
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                From Fragmented Execution to Systemized Intelligence
              </h2>
              <div
                className="enterprise-grid-2"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  textAlign: 'left',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Traditional:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Teams → Tools → Processes → Delays
                  </p>
                </div>
                <div
                  style={{
                    padding: '24px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Rivtor:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Objective → Decision → Coordinated Execution → Verified Outcome
                  </p>
                </div>
              </div>
              <div
                style={{
                  textAlign: 'left',
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '24px',
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Rivtor introduces a system where:
                </p>
                <div
                  className="enterprise-grid-2"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '32px',
                  }}
                >
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.15)',
                        margin: 0,
                        marginBottom: '8px',
                        fontFamily: 'var(--font-headline)',
                      }}
                    >
                      01
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Every action is tied to a decision
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.15)',
                        margin: 0,
                        marginBottom: '8px',
                        fontFamily: 'var(--font-headline)',
                      }}
                    >
                      02
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Every decision is validated
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.15)',
                        margin: 0,
                        marginBottom: '8px',
                        fontFamily: 'var(--font-headline)',
                      }}
                    >
                      03
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Every execution is coordinated
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.15)',
                        margin: 0,
                        marginBottom: '8px',
                        fontFamily: 'var(--font-headline)',
                      }}
                    >
                      04
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Every outcome is measured
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '16px',
                    marginTop: '0',
                    margin: 0,
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  This creates:
                </p>
                <div
                  className="enterprise-grid-3"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid ' + 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Alignment across functions
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid ' + 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Traceability across actions
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid ' + 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Control across systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capability Sections */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', marginBottom: '48px' }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Enterprise Capabilities
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Deep use cases for complex organizations
              </p>
            </div>
          </Reveal>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {capabilities.map((capability, index) => (
              <CapabilitySection key={index} capability={capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Control & Governance */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  textAlign: 'center',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Built for Control, Not Just Automation
              </h2>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '32px',
                }}
              >
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--rv-text-primary)',
                    margin: 0,
                    marginBottom: '16px',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  Decision Layer
                </p>
                <p style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.3)', margin: 0, marginBottom: '8px' }}>
                  ↓
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--rv-text-primary)',
                    margin: 0,
                    marginBottom: '16px',
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  Governance Layer
                </p>
                <p style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.3)', margin: 0, marginBottom: '8px' }}>
                  ↓
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--rv-text-primary)',
                    margin: 0,
                    fontFamily: 'var(--font-headline)',
                  }}
                >
                  Execution Layer
                </p>
              </div>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor enforces control across every layer:
              </p>
              <div
                className="enterprise-grid-3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '8px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Pre-execution validation
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Ensures decisions meet constraints and policies
                  </p>
                </div>
                <div
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '8px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Runtime governance
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Monitors actions as they execute
                  </p>
                </div>
                <div
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '8px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Post-execution evaluation
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Validates outcomes against expectations
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                You can:
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    require approvals
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    enforce boundaries
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    override when needed
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '32px',
                  marginBottom: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Result:
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '8px',
                  marginBottom: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                A system that operates autonomously — but always within your control.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Integration & Deployment */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '48px 32px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
              }}
            >
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Designed to Work Within Your Environment
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '32px',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor integrates into your existing ecosystem.
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                It can:
              </p>
              <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    operate across your current systems
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    align with internal workflows
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    adapt to your organizational structure
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Deployment is flexible:
              </p>
              <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    aligned with your infrastructure
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    controlled within your environment
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    designed for enterprise requirements
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '32px',
                  marginBottom: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Result:
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '8px',
                  margin: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Adoption without disruption.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Executive Value */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  textAlign: 'center',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What This Means at the Executive Level
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                {executiveValue.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        lineHeight: '1.3',
                        color: 'var(--rv-text-primary)',
                        marginBottom: '16px',
                        marginTop: 0,
                        fontFamily: 'var(--font-headline)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {item.points.map((point, idx) => (
                        <p
                          key={idx}
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.5',
                            color: 'rgba(255, 255, 255, 0.6)',
                            margin: 0,
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing Section */}
      <section className="rv-section-v4" style={{ paddingBottom: '120px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '32px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Enterprises Don't Need More Tools.
              </h2>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                They Need Systems That Can Operate at Scale.
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  marginTop: '32px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor replaces:
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    fragmented workflows
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    disconnected systems
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    manual coordination
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                with:
              </p>
              <div
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  marginBottom: '32px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    structured decisions
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    coordinated execution
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    continuous learning
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '8px',
                  margin: '0 auto',
                  fontFamily: 'var(--font-body)',
                }}
              >
                This is not automation.
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                This is controlled operational intelligence for enterprise scale.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CapabilitySection({ capability, index }: { capability: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div style={{ marginBottom: '64px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              lineHeight: '1.3',
              letterSpacing: '-0.5%',
              color: 'var(--rv-text-primary)',
              marginBottom: '12px',
              marginTop: 0,
              fontFamily: 'var(--font-headline)',
            }}
          >
            {capability.title}
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.4)',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            {capability.flow}
          </p>
        </div>

        <div
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-body)',
            }}
          >
            {capability.content}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
