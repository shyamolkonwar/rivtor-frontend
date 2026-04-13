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

const layers = [
  {
    title: 'Understanding Layer',
    description: 'Builds a living model of your company: your products, customers, operations, and goals. Not static data. A real-time representation that evolves as you evolve.',
  },
  {
    title: 'Decision Layer',
    description: 'The core intelligence. For every objective, it frames problems, generates multiple approaches, evaluates trade-offs, and selects the best path. This is where guesswork becomes reasoned execution.',
  },
  {
    title: 'Planning Layer',
    description: 'Transforms decisions into execution. Breaks strategy into steps, defines dependencies, aligns actions with goals. The output is not a checklist. It is a coordinated execution plan.',
  },
  {
    title: 'Execution Layer',
    description: 'Where plans become reality. Performs actions across your systems, manages workflows end-to-end, ensures completion. Structured, monitored, continuously optimized.',
  },
  {
    title: 'Coordination Layer',
    description: 'Real businesses are not linear. Manages multiple workflows at once, resolves conflicts, maintains alignment. No duplication. No missed steps.',
  },
  {
    title: 'Learning Layer',
    description: 'Every outcome feeds back into the system. Compares expected vs actual, identifies what worked, adapts future decisions. The system becomes more accurate, efficient, and aligned over time.',
  },
  {
    title: 'Governance Layer',
    description: 'Autonomy without control is risky. Enforces decision validation, risk-aware execution, policy-based boundaries. You always have visibility, control, and override capability.',
  }
];

export default function ArchitecturePage(): JSX.Element {
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
                Architecture
              </p>
              <h1
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
                Rivtor is built as a living system, not a collection of tools.
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
                Most software is designed as disconnected layers. Rivtor is designed as a continuous, decision-driven system that understands your business, makes decisions, executes across systems and learns from outcomes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Principle */}
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
                Core Principle
              </p>
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
                Everything starts with a decision
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
                      marginBottom: '12px',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Traditional systems
                  </p>
                  <p
                    style={{
                      fontSize: '18px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Actions trigger execution
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
                    Rivtor
                  </p>
                  <p
                    style={{
                      fontSize: '18px',
                      fontWeight: 500,
                      color: 'var(--rv-text-primary)',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Decisions trigger execution
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* System Layers */}
      <section className="rv-section-v4" style={{ paddingBottom: '80px' }}>
        <div className="rv-container-v4">
          <Reveal>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
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
                The System Layers
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
                Tightly connected layers, each responsible for a specific capability
              </p>
            </div>
          </Reveal>

          <div style={{ maxWidth: '720px', margin: '48px auto 0' }}>
            {layers.map((layer, index) => (
              <LayerSection key={index} layer={layer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* The Loop */}
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
                How everything connects
              </h2>
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '20px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Understand → Decide → Plan → Execute → Learn → Improve
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginTop: '16px',
                    marginBottom: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Each cycle strengthens the next.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters */}
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
                Why this architecture matters
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Most systems fail because they execute without thinking, act without context, repeat mistakes.
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Rivtor is built to think before acting, act with structure, learn continuously.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Result */}
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
                The result
              </h2>
              <p
                style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.7)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                A system that doesn't just assist, doesn't just automate. It operates your business with you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
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
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  marginBottom: '16px',
                  margin: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                This isn't software architecture.
              </p>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  letterSpacing: '-0.5%',
                  color: 'var(--rv-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                This is operational intelligence, built to run companies.
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

function LayerSection({ layer, index }: { layer: any; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div
        style={{
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: index < layers.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 0.15)',
              fontFamily: 'var(--font-headline)',
              minWidth: '40px',
            }}
          >
            {index + 1}
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '1.3',
                color: 'var(--rv-text-primary)',
                marginBottom: '8px',
                marginTop: 0,
                fontFamily: 'var(--font-headline)',
              }}
            >
              {layer.title}
            </h3>
          </div>
        </div>

        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          {layer.description}
        </p>
      </div>
    </Reveal>
  );
}
