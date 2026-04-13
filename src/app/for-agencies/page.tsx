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
    title: 'Turn Client Requests Into Structured Execution',
    number: '1',
    theReality: `Clients say:

"We want more leads"
"We need better performance"

Your team:

interprets it differently
creates ad-hoc plans
executes inconsistently`,
    withRivtor: `Client Input → Structured Objective → Execution Plan → Delivery

Rivtor:

converts client requests into clear objectives
defines what actually needs to be done
creates structured execution flows

Every client gets clarity — not interpretation.`,
  },
  {
    title: 'Standardize Delivery Without Losing Flexibility',
    number: '2',
    theReality: `Every client becomes a "custom project":

no consistency
no repeatable system
no leverage`,
    withRivtor: `Objective → Proven Patterns → Customized Execution

Rivtor:

applies proven execution patterns
adapts them to each client context
maintains consistency across accounts

You get:

repeatability + customization`,
  },
  {
    title: 'Execute Across Multiple Clients — Without Chaos',
    number: '3',
    theReality: `As clients increase:

work overlaps
priorities conflict
deadlines slip

Everything depends on manual coordination.`,
    withRivtor: `Multiple Clients → Prioritized Execution → Parallel Workflows

Rivtor:

manages multiple client workflows simultaneously
prioritizes based on impact and deadlines
prevents conflicts and duplication

You scale clients without losing control.`,
  },
  {
    title: 'Reduce Dependency on Team Bandwidth',
    number: '4',
    theReality: `Scaling means:

hiring more people
training them
managing quality

Margins shrink as team size grows.`,
    withRivtor: `More Work → System Execution → Stable Output

Rivtor:

takes ownership of execution layers
reduces dependency on manual effort
maintains consistent delivery

You increase output without proportional hiring.`,
  },
  {
    title: 'Deliver Measurable Outcomes — Not Just Work',
    number: '5',
    theReality: `Most agencies deliver:

reports
tasks completed
activity

But clients care about:

results`,
    withRivtor: `Execution → Outcome Tracking → Continuous Optimization

Rivtor:

tracks outcomes for every action
connects execution to results
continuously improves performance

You shift from:

"Here's what we did"
to
"Here's what improved"`,
  },
  {
    title: 'Continuous Optimization Across Accounts',
    number: '6',
    theReality: `Optimization is:

inconsistent
dependent on individuals
often reactive`,
    withRivtor: `Experiment → Result → Learning → Improved Strategy

Rivtor:

runs structured experiments
identifies winning patterns
applies learnings across accounts

Your agency gets smarter with every client.`,
  },
  {
    title: 'Build a True Delivery System — Not a Service Team',
    number: '7',
    theReality: `Most agencies are:

people-dependent
fragile
hard to scale`,
    withRivtor: `System → Executes → Team → Oversees

Rivtor:

becomes the execution backbone
ensures consistency
reduces operational fragility

Your team shifts to:

strategy
client relationships
high-level decisions`,
  },
  {
    title: 'Improve Margins Without Raising Prices',
    number: '8',
    theReality: `To grow revenue:

you either increase prices
or take more clients

Both increase pressure.`,
    withRivtor: `Lower Cost per Delivery → Higher Margin → Scalable Growth

Rivtor:

reduces execution cost
increases efficiency
maintains output quality

You improve margins without changing pricing.`,
  },
];

export default function ForAgenciesPage(): JSX.Element {
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
                Solutions for Agencies
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
                Agencies don't break because of lack of clients.
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
                They break because delivery doesn't scale.
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
                The Real Problem: Execution Overhead Kills Margins
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
                Inside most agencies:
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
                    Work is scattered across tools
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
                    Teams spend hours coordinating
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
                    Deliverables depend on people, not systems
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
                    Quality varies across clients
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
                    Scaling means hiring more people
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
                You're constantly:
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
                    chasing deadlines
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
                    managing clients manually
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
                    fixing execution gaps
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
                Rivtor turns your agency into a systemized delivery engine.
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
                    Client → Tasks → Team → Chaos
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
                    Client Objective → Decision → Structured Execution → Measurable Outcome
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
                      Every new client adds stress
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Delivery depends on constant coordination
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Scaling feels risky
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
                      Execution becomes predictable
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
                      Clients scale without chaos
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
                      Operations feel controlled
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
                    Performance marketing agencies
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
                    Creative and content agencies
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
                    Growth agencies
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
                    Agencies managing multiple clients and workflows
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
                        manually coordinating tasks
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
                        firefighting delivery issues
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
                        depending on inconsistent execution
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
                        hiring just to keep up
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
                        scaling client accounts confidently
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
                        delivering consistent outcomes
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
                        improving margins
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
                        building a system, not just a team
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
                Agencies don't scale with more people.
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
                They scale with better systems.
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
                Rivtor becomes that system.
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
