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

const sections = [
  {
    title: 'Turn Workflows Into Structured Systems',
    number: '1',
    theReality: `Most workflows are:

loosely defined
dependent on individuals
hard to track end-to-end`,
    withRivtor: `Workflow → Structured Execution Flow → Managed System

Rivtor:

defines workflows as structured execution systems
maps dependencies between steps
ensures every process follows a clear path

No more "it depends on who's handling it."`,
  },
  {
    title: 'Eliminate Manual Coordination',
    number: '2',
    theReality: `Operations teams spend most of their time:

following up
checking progress
coordinating between teams`,
    withRivtor: `Dependencies → Automatic Coordination → Continuous Progress

Rivtor:

understands dependencies between tasks
triggers actions automatically
ensures workflows move forward without manual push

Coordination becomes system-driven.`,
  },
  {
    title: 'Real-Time Visibility Across Everything',
    number: '3',
    theReality: `You don't know:

what's actually happening right now
where things are stuck
what's at risk`,
    withRivtor: `Execution → Tracking → Live System State → Insights

Rivtor:

tracks every action and outcome
maintains a real-time system view
surfaces bottlenecks and risks instantly

You see the system as it actually is — not through reports.`,
  },
  {
    title: 'Detect and Resolve Issues Before They Escalate',
    number: '4',
    theReality: `Problems are discovered:

too late
after impact
through complaints`,
    withRivtor: `Signal Detection → Issue Identification → Automated Response

Rivtor:

detects anomalies and delays
identifies root causes
triggers corrective actions

Issues are handled before they become problems.`,
  },
  {
    title: 'Ensure Consistency Across Processes',
    number: '5',
    theReality: `Execution varies because:

different people handle tasks differently
processes drift over time
standards are not enforced`,
    withRivtor: `Defined System → Consistent Execution → Controlled Output

Rivtor:

enforces structured execution
maintains consistency across workflows
prevents process drift

Every process runs the way it's supposed to.`,
  },
  {
    title: 'Handle Complexity Without Breaking',
    number: '6',
    theReality: `As systems grow:

dependencies increase
coordination becomes harder
failures become more frequent`,
    withRivtor: `Complex Workflows → Coordinated Execution → Stable System

Rivtor:

manages complex dependencies
prioritizes tasks intelligently
ensures smooth execution across systems

Complexity is handled — not avoided.`,
  },
  {
    title: 'Continuous Process Improvement',
    number: '7',
    theReality: `Process improvement is:

manual
slow
based on limited insight`,
    withRivtor: `Execution → Outcome → Analysis → Process Update

Rivtor:

evaluates outcomes of every workflow
identifies inefficiencies
updates processes automatically

Your operations improve continuously — without separate effort.`,
  },
  {
    title: 'Maintain Control Without Slowing Down',
    number: '8',
    theReality: `More control usually means:

slower execution
more approvals
more friction`,
    withRivtor: `Execution → Governance → Controlled Autonomy

Rivtor:

enforces rules and constraints
applies approvals only when needed
balances speed with control

You stay in control without becoming a bottleneck.`,
  },
];

export default function ForOperationsPage(): JSX.Element {
  return (
    <main className="rv-landing-v4">
      <Navbar />

      {/* Navbar spacer */}
      <div style={{ height: '72px' }} aria-hidden="true" />

      {/* Header */}
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
                Solutions for Operations Teams
              </p>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-headline)',
                }}
              >
                Operations isn't about doing more work.
              </h1>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 400,
                  lineHeight: '1.2',
                  letterSpacing: '-1%',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                It's about making sure nothing breaks.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* The Real Problem */}
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
                The Real Problem: Invisible Complexity
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Operations complexity doesn't show up as one problem.
              </p>
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
                It shows up as:
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
                    delays that no one can explain
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
                    tasks that depend on each other but aren't tracked
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
                    processes that work… until they don't
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
                    constant need for manual intervention
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
                  marginTop: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                }}
              >
                You're always:
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
                    checking status
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
                    resolving blockers
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
                    aligning teams
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Rivtor Changes */}
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
                  marginBottom: '24px',
                  marginTop: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                What Rivtor Changes
              </h2>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Rivtor converts operations into a structured, continuously managed system.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  textAlign: 'left',
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
                    Instead of:
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Workflow → People → Follow-ups → Delays
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
                    You get:
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
                    Objective → Structured Execution → Continuous Monitoring → Reliable Outcomes
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {sections.map((section, index) => (
              <SectionContent key={index} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What This Actually Feels Like */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
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
                What This Actually Feels Like
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                  textAlign: 'left',
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
                      marginBottom: '16px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Before Rivtor:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      You are constantly monitoring
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Everything requires manual intervention
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Issues appear unexpectedly
                    </p>
                  </div>
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
                      marginBottom: '16px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    After Rivtor:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--rv-text-primary)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      The system runs continuously
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
                      You focus on improving, not fixing
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
                      Operations become predictable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
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
                Who This Is For
              </h2>
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
                    Operations teams managing complex workflows
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
                    Companies struggling with coordination and delays
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
                    Teams dealing with scaling complexity
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
                    Organizations needing reliability and control
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What You Stop/Start Doing */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    What You Stop Doing
                  </p>
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.5)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        chasing updates
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
                        manually coordinating teams
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
                        reacting to problems
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
                        managing fragmented workflows
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginBottom: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    What You Start Doing
                  </p>
                  <div
                    style={{
                      padding: '24px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid ' + 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                        overseeing a system that runs continuously
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
                        improving processes instead of fixing them
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
                        making informed operational decisions
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
                        scaling operations with confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final Statement */}
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
              <p
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
                Operations shouldn't depend on constant attention.
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '16px',
                  margin: '0 auto 16px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                They should run as a system.
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
                Rivtor makes that possible.
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

function SectionContent({ section, index }: { section: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-headline)',
              minWidth: '60px',
            }}
          >
            {section.number}
          </div>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '1.3',
                letterSpacing: '-0.5%',
                color: 'var(--rv-text-primary)',
                marginBottom: 0,
                marginTop: 0,
                fontFamily: 'var(--font-headline)',
              }}
            >
              {section.title}
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
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
              The Reality
            </p>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-body)',
              }}
            >
              {section.theReality}
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid ' + 'rgba(255, 255, 255, 0.08)',
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
              With Rivtor
            </p>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.8)',
                whiteSpace: 'pre-line',
                fontFamily: 'var(--font-body)',
              }}
            >
              {section.withRivtor}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
